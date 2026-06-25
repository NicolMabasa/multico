# Multico — Multiply Your Content

An AI-powered content repurposing web app that turns one piece of content into platform-ready posts for TikTok, LinkedIn, Instagram, Facebook, Twitter, Newsletter and YouTube Shorts.

## What it does

Users paste a blog post, podcast transcript, or video script into Multico. The app uses AI to instantly rewrite the content into optimised posts for every major social media platform — saving content creators hours of manual work.

## Features

- Repurposes content for 7 platforms simultaneously
- Platform-specific AI prompts for each social network
- Copy to clipboard functionality for each result
- Responsive design — works on mobile and desktop
- Fast AI responses powered by Groq

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **AI:** Groq API (llama-3.3-70b-versatile model)
- **Environment:** dotenv for secure API key management
- **Deployment:** Coming soon

## How to run locally

1. Clone the repository
git clone https://github.com/NicolMabasa/multico.git

2. Navigate into the project folder
cd multico

3. Install dependencies
npm install

4. Create a `.env` file in the root folder and add your Groq API key
GROQ_API_KEY=your-groq-api-key-here (can't post my API key cause it has to be secret)

5. Start the server
node index.js

6. Open your browser and visit
http://localhost:3000

## Why I built this

Content creators spend hours manually reformatting the same content for different platforms. Multico solves this by using AI to do the reformatting instantly — turning one piece of content into many platform-ready posts in seconds.

## Author

Nicol Mabasa — Computer Science and Computer Engineering student
