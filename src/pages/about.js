// ═══════════════════════════════════════════════════════════
// About Page — The People Behind InterviewOS
// ═══════════════════════════════════════════════════════════

export function renderAboutPage(container) {
  container.innerHTML = `
    <div class="page-container" style="padding-top: 56px; max-width: 900px; margin: 0 auto; width: 100%;">
      <!-- HEADER -->
      <div style="margin-bottom: 48px;">
        <div style="color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">// about_us</div>
        <h1 style="color: white; font-family: var(--font-mono); font-size: 32px; font-weight: 700; margin-bottom: 12px;">the people behind interviewos</h1>
        <p style="color: #6B7280; font-family: 'Inter', sans-serif; font-size: 14px;">built by students, for students.</p>
      </div>

      <!-- FOUNDERS SECTION -->
      <style>
        .founder-links { display: flex; gap: 12px; justify-content: center; margin-top: 8px; }
        .founder-links a { font-family: var(--font-mono); font-size: 11px; color: #6B7280; border: 1px solid #1a1a1a; padding: 4px 10px; border-radius: 3px; text-decoration: none; transition: all 0.15s; }
        .founder-links a:hover { border-color: #00FF41; color: #00FF41; }
      </style>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 64px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;">
          <img 
            src="/images/shreya.png" 
            alt="Shreya Yagain"
            style="width: 140px; height: 140px; border-radius: 8px; object-fit: cover; border: 2px solid #00FF41; display: block;"
          />
          <div style="font-family: var(--font-mono); color: white; font-size: 16px; font-weight: bold;">Shreya Yagain</div>
          <div class="founder-links">
            <a href="https://www.linkedin.com/in/shreya-yagain-75a787384/" target="_blank">linkedin</a>
            <a href="https://github.com/ShreyaYagain" target="_blank">github</a>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;">
          <img 
            src="/images/ankit.png" 
            alt="Sai Ankit Panda"
            style="width: 140px; height: 140px; border-radius: 8px; object-fit: cover; border: 2px solid #00FF41; display: block;"
          />
          <div style="font-family: var(--font-mono); color: white; font-size: 16px; font-weight: bold;">Sai Ankit Panda</div>
          <div class="founder-links">
            <a href="https://www.linkedin.com/in/sai-ankit-panda-80301824b/" target="_blank">linkedin</a>
            <a href="https://github.com/Saiankitpanda" target="_blank">github</a>
          </div>
        </div>
      </div>

      <!-- WHY SECTION -->
      <div style="margin-bottom: 64px;">
        <div style="color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">// why_we_built_this</div>
        <h2 style="color: white; font-family: var(--font-mono); font-size: 22px; font-weight: 700; margin-bottom: 24px;">the problem we lived through</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          <div style="border-left: 3px solid #00FF41; background: #0d0d0d; padding: 24px;">
            <h3 style="font-family: var(--font-mono); color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">the gap no one was filling</h3>
            <p style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 13px; line-height: 1.8;">As engineering students preparing for placements, we kept running into the same wall. There were platforms for coding practice. There were platforms for mock interviews. There were resources scattered across YouTube, Notion docs, and random GitHub repos. But nothing brought it all together in one place designed specifically for us — students, not professionals already in the industry.</p>
          </div>
          <div style="border-left: 3px solid #00FF41; background: #0d0d0d; padding: 24px;">
            <h3 style="font-family: var(--font-mono); color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">what made us start building</h3>
            <p style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 13px; line-height: 1.8;">We watched our peers fail interviews not because they lacked knowledge, but because they had no structured way to prepare. No feedback loop. No simulation of real interview pressure. No single platform that understood the Indian engineering student's journey from college to their first offer. So we built one.</p>
          </div>
        </div>
      </div>

      <!-- HOW SECTION -->
      <div style="margin-bottom: 64px;">
        <div style="color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">// how_it_changes_things</div>
        <h2 style="color: white; font-family: var(--font-mono); font-size: 22px; font-weight: 700; margin-bottom: 24px;">what changes with interviewos</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px;">
            <div style="color: #EF4444; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">> before</div>
            <h3 style="font-family: var(--font-mono); color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">scattered preparation</h3>
            <p style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 12px; line-height: 1.6;">Notes in one place, coding on another platform, mock interviews somewhere else, job tracking in a spreadsheet. No connection between any of it.</p>
          </div>
          <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px;">
            <div style="color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">> after</div>
            <h3 style="font-family: var(--font-mono); color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">everything in one place</h3>
            <p style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 12px; line-height: 1.6;">Study notes, DSA practice, system design prep, AI-powered mock interviews, resume builder, and job tracker — all connected, all tracking your progress.</p>
          </div>
          <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px;">
            <div style="color: #FACC15; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">> impact</div>
            <h3 style="font-family: var(--font-mono); color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">closing the tier gap</h3>
            <p style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 12px; line-height: 1.6;">Students at tier 2 and tier 3 colleges now have access to the same quality of preparation that was previously only available at top institutions or through expensive coaching.</p>
          </div>
        </div>
      </div>

      <!-- PLATFORM SECTION -->
      <div style="margin-bottom: 48px;">
        <div style="color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">// what_is_interviewos</div>
        <h2 style="color: white; font-family: var(--font-mono); font-size: 22px; font-weight: 700; margin-bottom: 24px;">not just another prep tool</h2>
        <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 32px;">
          <p style="font-family: 'Inter', sans-serif; color: #CCCCCC; font-size: 14px; line-height: 1.9; margin: 0;">InterviewOS is a placement preparation operating system built specifically for Indian engineering students. It combines a structured study planner, a curated DSA question bank, AI-powered interview simulation across all five FAANG rounds, a resume builder, a code compiler, and a job application tracker — into one dark, fast, terminal-inspired platform. No fluff. No accounts required to explore. Just open it and start preparing.</p>
        </div>
      </div>

      <!-- FOOTER NOTE -->
      <div style="color: #374151; font-family: var(--font-mono); font-size: 11px; text-align: center; margin-top: 48px; margin-bottom: 48px;">
        // built with love for every student who ever got rejected and didn't know why.
      </div>
    </div>
  `;
}
