// api/generate.js
export default async function handler(req, res) {
    const { prompt } = req.body;
    // 这里的 GEMINI_API_KEY 我们稍后会在 Vercel 的后台设置，不需要写死在这里
    const apiKey = process.env.GEMINI_API_KEY; 

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        res.status(200).json({ text: aiText });
    } catch (error) {
        res.status(500).json({ error: "AI 思考罢工了，请稍后再试" });
    }
}