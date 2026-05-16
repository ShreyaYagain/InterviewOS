// ═══════════════════════════════════════════════════════════
// API Engine — Groq (Llama 3.3 70B)
// ═══════════════════════════════════════════════════════════

export async function callGrokAPI(systemPrompt, userMessage) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) throw new Error("Groq API key is missing from .env");

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                max_tokens: 1500,
                temperature: 0.3,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`API error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error("AI Error:", err);
        throw err;
    }
}

export async function searchGitHubFOSS(techStack) {
    return [
        {
            name: "system-design-primer",
            repo_url: "https://github.com/donnemartin/system-design-primer",
            why: "Matches HLD and distributed systems requirement.",
            stars: 250000
        },
        {
            name: "build-your-own-x",
            repo_url: "https://github.com/codecrafters-io/build-your-own-x",
            why: "Perfect for LLD and deep tech stack understanding.",
            stars: 200000
        }
    ];
}
