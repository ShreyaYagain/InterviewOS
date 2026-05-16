// ═══════════════════════════════════════════════════════════
// Minimal In-Browser SQL Engine — Pure JS, no dependencies
// Supports: SELECT, FROM, JOIN, LEFT JOIN, WHERE, GROUP BY,
//           HAVING, ORDER BY, LIMIT, DISTINCT, COUNT, SUM,
//           AVG, MIN, MAX, ROUND, IFNULL, IS NULL, IS NOT NULL
// ═══════════════════════════════════════════════════════════

class MiniSQL {
    constructor() { this.tables = {}; }

    createTable(name, rows) { this.tables[name.toUpperCase()] = rows.map(r => ({...r})); }

    query(sql) {
        const s = sql.trim().replace(/;+\s*$/, '').replace(/\s+/g, ' ');
        if (/^SELECT/i.test(s)) return this._select(s);
        throw new Error('Only SELECT queries are supported in the playground.');
    }

    _select(sql) {
        // Strip trailing semicolons
        sql = sql.replace(/;+\s*$/, '').trim();
        let main = sql;
        const ctes = {};
        if (/^WITH\s+/i.test(sql)) {
            const m = sql.match(/^WITH\s+(\w+)\s+AS\s*\(([\s\S]+?)\)\s*(SELECT[\s\S]+)$/i);
            if (!m) throw new Error('Invalid WITH syntax');
            const cteSql = m[2].trim();
            ctes[m[1].toUpperCase()] = this._select(cteSql);
            main = m[3].trim();
        }

        // Tokenise clauses
        const parts = main.replace(/\bWHERE\b/gi, '§WHERE§').replace(/\bFROM\b/gi, '§FROM§')
            .replace(/\bLEFT JOIN\b/gi, '§LEFTJOIN§').replace(/\bINNER JOIN\b/gi, '§JOIN§')
            .replace(/\bJOIN\b/gi, '§JOIN§').replace(/\bON\b/gi, '§ON§')
            .replace(/\bGROUP BY\b/gi, '§GROUPBY§').replace(/\bHAVING\b/gi, '§HAVING§')
            .replace(/\bORDER BY\b/gi, '§ORDERBY§').replace(/\bLIMIT\b/gi, '§LIMIT§');

        const seg = k => { const i = parts.indexOf(k); if (i === -1) return null; const next = ['§FROM§','§LEFTJOIN§','§JOIN§','§ON§','§WHERE§','§GROUPBY§','§HAVING§','§ORDERBY§','§LIMIT§','§SELECT§'].filter(x=>x!==k); let e = parts.length; for (const n of next) { const ni = parts.indexOf(n,i+k.length); if (ni>i && ni<e) e=ni; } return parts.slice(i+k.length,e).trim(); };

        const distinct = /^SELECT\s+DISTINCT\s+/i.test(main);
        const rawCols = (seg('SELECT') || seg('§SELECT§') || parts.split('§FROM§')[0].replace(/^SELECT\s+(DISTINCT\s+)?/i,'')).trim();
        const fromClause = seg('§FROM§') || '';
        const whereClause = seg('§WHERE§');
        const groupByClause = seg('§GROUPBY§');
        const havingClause = seg('§HAVING§');
        const orderByClause = seg('§ORDERBY§');
        const limitClause = seg('§LIMIT§');

        // Build base dataset
        let rows = [];
        let aliases = {};
        if (fromClause) {
            const fromParts = fromClause.split(/\s+/);
            const tblName = fromParts[0].toUpperCase();
            const tblAlias = fromParts[1] ? fromParts[1].toUpperCase().replace(/,$/,'') : tblName;
            aliases[tblAlias] = tblName;

            const source = ctes[tblName] || this.tables[tblName];
            if (!source) throw new Error(`Table "${fromParts[0]}" not found`);
            rows = source.map(r => prefixRow(r, tblAlias));

            // Handle JOINs
            const joinPattern = /§(LEFT)?JOIN§\s+(\w+)(?:\s+(\w+))?\s+§ON§\s+([^§]+)/g;
            let jm;
            while ((jm = joinPattern.exec(parts)) !== null) {
                const isLeft = !!jm[1];
                const jTbl = jm[2].toUpperCase();
                const jAlias = jm[3] ? jm[3].toUpperCase() : jTbl;
                aliases[jAlias] = jTbl;
                const onCond = jm[4].trim();
                const jSrc = ctes[jTbl] || this.tables[jTbl];
                if (!jSrc) throw new Error(`Table "${jm[2]}" not found`);
                const jRows = jSrc.map(r => prefixRow(r, jAlias));
                rows = this._join(rows, jRows, onCond, isLeft, aliases);
            }
        }

        // WHERE
        if (whereClause) rows = rows.filter(r => evalCond(whereClause, r));

        // GROUP BY / aggregates
        const colList = splitCols(rawCols);
        const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(rawCols) || groupByClause;

        if (hasAgg) {
            const groupKeys = groupByClause ? groupByClause.split(',').map(s=>s.trim()) : [];
            const groups = {};
            for (const r of rows) {
                const key = groupKeys.map(k => resolveVal(k, r) ?? '').join('|');
                if (!groups[key]) groups[key] = [];
                groups[key].push(r);
            }
            rows = Object.values(groups).map(grp => buildAggRow(grp, colList, groupKeys));
            if (havingClause) rows = rows.filter(r => evalCond(havingClause, r));
        }

        // SELECT columns
        rows = rows.map(r => projectRow(r, colList));

        // DISTINCT
        if (distinct) {
            const seen = new Set();
            rows = rows.filter(r => { const k = JSON.stringify(r); if (seen.has(k)) return false; seen.add(k); return true; });
        }

        // ORDER BY
        if (orderByClause) {
            const orders = orderByClause.split(',').map(o => {
                const m = o.trim().match(/^(.+?)\s*(ASC|DESC)?$/i);
                return { col: m[1].trim(), desc: /DESC/i.test(m[2]||'') };
            });
            rows.sort((a,b) => {
                for (const {col, desc} of orders) {
                    const av = getVal(a, col); const bv = getVal(b, col);
                    const cmp = av==null?-1:bv==null?1:typeof av==='number'&&typeof bv==='number'?av-bv:String(av).localeCompare(String(bv));
                    if (cmp !== 0) return desc ? -cmp : cmp;
                }
                return 0;
            });
        }

        // LIMIT
        if (limitClause) {
            const [lim, off] = limitClause.split(/\s+OFFSET\s+/i).map(Number);
            rows = rows.slice(off||0, (off||0)+lim);
        }

        return rows;
    }

    _join(left, right, cond, isLeft, aliases) {
        const result = [];
        const m = cond.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
        if (!m) throw new Error('Cannot parse ON condition: ' + cond);
        const [,la,lc,ra,rc] = m;
        const lKey = la.toUpperCase()+'_'+lc.toUpperCase();
        const rKey = ra.toUpperCase()+'_'+rc.toUpperCase();

        for (const lr of left) {
            const matches = right.filter(rr => lr[lKey] === rr[rKey] || lr[rKey] === rr[lKey]);
            if (matches.length > 0) {
                matches.forEach(rr => result.push({...lr,...rr}));
            } else if (isLeft) {
                const nullRow = {};
                Object.keys(right[0]||{}).forEach(k => nullRow[k] = null);
                result.push({...lr,...nullRow});
            }
        }
        return result;
    }
}

function prefixRow(r, alias) {
    const out = {};
    for (const k of Object.keys(r)) out[alias+'_'+k.toUpperCase()] = r[k];
    return out;
}

function splitCols(raw) {
    const cols = []; let depth = 0; let cur = '';
    for (const ch of raw) {
        if (ch==='(') depth++;
        if (ch===')') depth--;
        if (ch===',' && depth===0) { cols.push(cur.trim()); cur=''; }
        else cur += ch;
    }
    if (cur.trim()) cols.push(cur.trim());
    return cols;
}

function resolveVal(expr, row) {
    const e = expr.trim();
    if (/^'.*'$/.test(e)) return e.slice(1,-1);
    if (/^-?\d+(\.\d+)?$/.test(e)) return parseFloat(e);
    // table.col or alias_col
    const dotM = e.match(/^(\w+)\.(\w+)$/);
    if (dotM) { const k = dotM[1].toUpperCase()+'_'+dotM[2].toUpperCase(); return row[k] ?? null; }
    // bare col — search all keys
    const upper = e.toUpperCase();
    for (const k of Object.keys(row)) { if (k === upper || k.endsWith('_'+upper)) return row[k]; }
    return null;
}

function getVal(row, expr) {
    const upper = expr.toUpperCase().replace('.','_');
    if (row.hasOwnProperty(expr)) return row[expr];
    for (const k of Object.keys(row)) { if (k === upper || k.endsWith('_'+upper)) return row[k]; }
    return null;
}

function buildAggRow(grp, colList, groupKeys) {
    const result = {};
    // Add group key values from first row
    for (const gk of groupKeys) {
        const v = resolveVal(gk, grp[0]);
        const alias = gk.replace(/\w+\./,'').toUpperCase();
        result[alias] = v;
    }
    // Compute aggregates for column list
    for (const col of colList) {
        const aggM = col.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?(\*|\w+(?:\.\w+)?)\s*\)\s*(?:AS\s+(\w+))?$/i);
        if (aggM) {
            const [,fn,,field,alias] = aggM;
            const vals = grp.map(r => resolveVal(field==='*'?groupKeys[0]||'*':field, r)).filter(v=>v!=null);
            let agg;
            switch(fn.toUpperCase()) {
                case 'COUNT': agg = field==='*'?grp.length:vals.length; break;
                case 'SUM': agg = vals.reduce((a,b)=>a+b,0); break;
                case 'AVG': agg = vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null; break;
                case 'MIN': agg = Math.min(...vals); break;
                case 'MAX': agg = Math.max(...vals); break;
            }
            result[alias || `${fn}(${field})`] = agg;
        }
    }
    return {...grp[0], ...result};
}

function projectRow(row, colList) {
    if (colList.length === 1 && colList[0] === '*') {
        // strip prefixes for display
        const out = {};
        for (const k of Object.keys(row)) {
            const parts = k.split('_');
            const col = parts.length > 1 ? parts.slice(1).join('_') : k;
            out[col] = row[k];
        }
        return out;
    }
    const out = {};
    for (const col of colList) {
        // ROUND(expr, n) AS alias
        const roundM = col.match(/^ROUND\(\s*(.+?)\s*,\s*(\d+)\s*\)\s*(?:AS\s+(\w+))?$/i);
        if (roundM) { const v = resolveVal(roundM[1], row); out[roundM[3]||col] = v!=null?parseFloat(v.toFixed(parseInt(roundM[2]))):null; continue; }
        // IFNULL(expr, val) AS alias
        const ifnullM = col.match(/^IFNULL\(\s*(.+?)\s*,\s*(.+?)\s*\)\s*(?:AS\s+(\w+))?$/i);
        if (ifnullM) { const v = resolveVal(ifnullM[1], row); out[ifnullM[3]||col] = v!=null?v:resolveVal(ifnullM[2],row); continue; }
        // AGG func
        const aggM = col.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(.*\)\s*(?:AS\s+(\w+))?$/i);
        if (aggM) { const alias = aggM[2]||col; out[alias] = row[alias] ?? row[col] ?? null; continue; }
        // alias
        const asM = col.match(/^(.+)\s+AS\s+(\w+)$/i);
        if (asM) { out[asM[2]] = resolveVal(asM[1], row); continue; }
        // plain col
        const v = resolveVal(col, row);
        const label = col.replace(/\w+\./,'');
        out[label] = v;
    }
    return out;
}

function evalCond(cond, row) {
    // IS NULL / IS NOT NULL
    const isNullM = cond.match(/^(.+?)\s+IS\s+(NOT\s+)?NULL$/i);
    if (isNullM) { const v = resolveVal(isNullM[1], row); return isNullM[2] ? v != null : v == null; }
    // AND / OR (simple, no nesting)
    if (/\s+AND\s+/i.test(cond)) return cond.split(/\s+AND\s+/i).every(c => evalCond(c.trim(), row));
    if (/\s+OR\s+/i.test(cond)) return cond.split(/\s+OR\s+/i).some(c => evalCond(c.trim(), row));
    // Comparison
    const cmpM = cond.match(/^(.+?)\s*(>=|<=|<>|!=|>|<|=)\s*(.+)$/);
    if (cmpM) {
        const l = resolveVal(cmpM[1].trim(), row);
        const r = resolveVal(cmpM[3].trim(), row);
        switch(cmpM[2]) {
            case '=': return l == r;
            case '!=': case '<>': return l != r;
            case '>': return l > r;
            case '<': return l < r;
            case '>=': return l >= r;
            case '<=': return l <= r;
        }
    }
    // LIKE
    const likeM = cond.match(/^(.+?)\s+(?:NOT\s+)?LIKE\s+'([^']+)'/i);
    if (likeM) {
        const v = String(resolveVal(likeM[1], row) ?? '');
        const pat = likeM[2].replace(/%/g,'.*').replace(/_/g,'.');
        const match = new RegExp('^'+pat+'$','i').test(v);
        return /NOT\s+LIKE/i.test(cond) ? !match : match;
    }
    // IN (...)
    const inM = cond.match(/^(.+?)\s+(NOT\s+)?IN\s*\(([^)]+)\)$/i);
    if (inM) {
        const v = resolveVal(inM[1].trim(), row);
        const vals = inM[3].split(',').map(x => { const t = x.trim(); return /^'.*'$/.test(t)?t.slice(1,-1):parseFloat(t); });
        return inM[2] ? !vals.includes(v) : vals.includes(v);
    }
    return true;
}

export { MiniSQL };
