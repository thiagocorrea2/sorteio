
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🟢 MongoDB conectado com sucesso"))
.catch(err => console.error("🔴 Erro na conexão MongoDB:", err.message));

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  insta: String,
  usuario: String,
  senha: String,
  moedas: { type: Number, default: 0 },
  jaGanhouGratis: { type: Boolean, default: false }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const existe = await Usuario.findOne({ usuario: req.body.usuario });
    if (existe) return res.status(400).json({ error: 'Usuário já existe' });
    const novo = new Usuario(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await Usuario.findOne({ usuario: req.body.usuario, senha: req.body.senha });
    if (!user) return res.status(401).json({ error: 'Login inválido' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});

app.get('/users', async (req, res) => {
  const lista = await Usuario.find();
  res.json(lista);
});

app.put('/users/:id', async (req, res) => {
  const atualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

app.delete('/users/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuário excluído' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
