const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.APP_USR-8932606705872473-112914-bc346fe48f3e17194d5ae3aa4a9ad4b3-1142591529
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create_preference', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Pacote de Moedas - InstaBoost',
          quantity: 1,
          unit_price: 5.00
        }
      ],
      back_urls: {
        success: 'https://instaboost-site.com/obrigado',
        failure: 'https://instaboost-site.com/falha',
        pending: 'https://instaboost-site.com/pendente'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (err) {
    console.error('Erro na criação da preferência:', err);
    res.status(500).send('Erro interno');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});