export async function getRoleMatches(profileData) {
  const {
    branch, year, interests, workStyle,
    problemType, projects, codingLevel
  } = profileData;

  // Build compact project summary — low token usage
  const projectSummary = projects
    .filter(p => p.name)
    .map(p => `${p.name} | ${p.stack} | ${p.type}`)
    .join('\n');

  const prompt = `You are a tech career advisor for 
Indian engineering students. Analyze this student 
profile and recommend exactly 4 tech roles that fit them.

STUDENT PROFILE:
Branch: ${branch}
Year: ${year}
Interests: ${interests.join(', ')}
Work style: ${workStyle}
Problem preference: ${problemType}
Coding level: ${codingLevel}
Projects:
${projectSummary || 'No projects listed'}

RULES:
1. Only recommend CSE/tech roles
2. Rank roles from best fit to least fit
3. Be specific about WHY each role fits THIS student
4. Reference their actual interests and projects
5. Be encouraging but honest
6. Keep each explanation under 60 words

Return ONLY this exact JSON, no other text:
{
  "roles": [
    {
      "title": "Role Title",
      "match": 95,
      "why": "2-3 sentences explaining why this fits them specifically based on their profile",
      "study": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      "companies": ["Company type 1", "Company type 2"],
      "timeline": "3-6 months to be ready"
    }
  ],
  "summary": "One encouraging sentence about their profile overall"
}`;

  // Use whatever AI service is available
  // Try Groq first
  const groqKey = import.meta.env.VITE_GROQ_API_KEY
    || import.meta.env.VITE_GROK_API_KEY;

  if (!groqKey) {
    throw new Error('No AI API key found in .env');
  }

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI API error: ${err}`);
  }

  const data = await response.json();
  const raw = data.choices[0].message.content;

  // Strip markdown fences if present
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleaned);
}
