// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "foyamayalabelaarous9341", // ⛔ Replace this with your actual key
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt || "Hello!";
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a boss in a Roblox fighting game. Speak like a strategic overlord." },
        { role: "user", content: userPrompt },
      ],
    });

    const aiReply = completion.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error from OpenAI" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
