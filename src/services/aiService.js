// ═══════════════════════════════════════════════════════════
// AI Service — Groq (Llama 3.3 70B)
// ═══════════════════════════════════════════════════════════

export async function callGroq(systemPrompt, userMessage, parseJSON = false, customApiKey = null) {
    const apiKey = customApiKey || import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) throw new Error('Groq API Key is missing');

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 2000,
            temperature: 0.2,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ]
        })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const raw = data.choices[0]?.message?.content || '';

    if (parseJSON) {
        const cleaned = raw.replace(/```json|```/g, '').trim();
        try {
            return JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse JSON:', cleaned);
            throw new Error('AI returned invalid JSON');
        }
    }
    return raw;
}

// Keep callClaude for backward compatibility since it was used in this file
export async function callClaude(systemPrompt, userMessage, parseJSON = false) {
    return callGroq(systemPrompt, userMessage, parseJSON);
}

export async function getAIReview(mode, code, language, problemTitle, problemDesc) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        return { output: 'Groq API Key missing. Set VITE_GROQ_API_KEY in .env', status: 'error', poweredBy: 'System' };
    }

    let systemPrompt = "You are an expert software engineer. Provide clear, actionable feedback.";
    let userPrompt = `Problem: ${problemTitle || 'Custom Code'}\nDescription: ${problemDesc || 'N/A'}\n\nCode (${language}):\n\`\`\`${language}\n${code}\n\`\`\`\n`;

    if (mode === 'debug') userPrompt += "\nDebug this code. Tell me if it works. If not, explain bugs and show fixes.";
    else if (mode === 'explain') userPrompt += "\nExplain step by step. Give time/space complexity.";
    else if (mode === 'optimize') userPrompt += "\nSuggest optimizations for time/space complexity.";
    else userPrompt += "\nReview this code.";

    try {
        const result = await callClaude(systemPrompt, userPrompt, false);
        return { output: result, status: 'success', poweredBy: 'Llama 3.3 70B (Groq)' };
    } catch (err) {
        return { output: `AI request failed: ${err.message}`, status: 'error', poweredBy: 'System' };
    }
}
