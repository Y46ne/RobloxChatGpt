// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt || "Hello!";

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a boss in a Roblox fighting game. Speak like a strategic overlord.",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "OpenAI request failed." });
  }
});

// Use Render's dynamic port, fallback to 3000 for local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('Uwu 1');
});
