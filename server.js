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
      model: "gpt-4", // Or "gpt-3.5-turbo" if you prefer
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
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
