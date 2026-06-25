const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const Groq = require('groq-sdk');

dotenv.config();

const app = express();
const PORT = 3000;

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/multiply', async (req, res) => {
    const { content, platforms } = req.body;

    if (!content || !platforms || platforms.length === 0) {
        return res.status(400).json({ 
            error: 'Please provide content and select at least one platform' 
        });
    }

    try {
        const results = {};

        for (const platform of platforms) {
            const prompt = generatePrompt(platform, content);

            const completion = await client.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1024
            });

            results[platform] = completion.choices[0].message.content;
        }

        res.json({ results });

    } catch (error) {
        console.error('AI error:', error);
        res.status(500).json({ 
            error: 'Something went wrong. Please try again.' 
        });
    }
});

function generatePrompt(platform, content) {
    const prompts = {
        tiktok: `You are a TikTok content creator. Rewrite the following content as an engaging TikTok video script. Make it punchy, conversational and under 60 seconds when spoken. Include a hook in the first 3 seconds. Content: ${content}`,
        
        linkedin: `You are a LinkedIn content strategist. Rewrite the following content as a professional LinkedIn post. Make it insightful, add paragraph breaks for readability, and end with a thought provoking question to encourage comments. Keep it under 300 words. Content: ${content}`,
        
        instagram: `You are an Instagram content creator. Rewrite the following content as an Instagram caption. Make it engaging and conversational. Add 10 to 15 relevant hashtags at the end. Keep the caption under 150 words. Content: ${content}`,
        
        facebook: `You are a Facebook content creator. Rewrite the following content as a friendly Facebook post. Make it conversational, relatable and engaging. Encourage people to like and share. Keep it under 200 words. Content: ${content}`,
        
        twitter: `You are a Twitter content creator. Rewrite the following content as a Twitter thread. Start with a compelling opening tweet, then break the rest into numbered tweets. Each tweet must be under 280 characters. Create between 5 and 8 tweets. Content: ${content}`,
        
        newsletter: `You are an email newsletter writer. Rewrite the following content as a newsletter section. Include a compelling subject line at the top, then write the content in a friendly but informative tone. Keep it under 250 words. Content: ${content}`,
        
        youtube: `You are a YouTube Shorts scriptwriter. Rewrite the following content as a YouTube Shorts script. Make it engaging, fast paced and under 60 seconds when spoken. Include a strong hook, main point and call to action. Content: ${content}`
    };

    return prompts[platform];
}

app.listen(PORT, () => {
    console.log(`Multico is running on http://localhost:${PORT}`);
});