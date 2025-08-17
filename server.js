const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve index.html e assets

let messages = [];

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Todos os campos são obrigatórios" });
  }
  const newMessage = { name, email, message, date: new Date() };
  messages.push(newMessage);
  console.log("Nova mensagem recebida:", newMessage);
  res.json({ success: true, message: "Mensagem recebida com sucesso!" });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
