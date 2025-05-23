# Backend InstaBoost

Este é o backend para o site de sorteios InstaBoost com integração ao Mercado Pago.

## Como usar localmente

1. Instale as dependências:
```
npm install
```

2. Crie um arquivo `.env` com sua chave privada do Mercado Pago:
```
MP_ACCESS_TOKEN=SEU_TOKEN_PRIVADO_DO_MERCADO_PAGO
```

3. Rode o servidor:
```
node pagamento-backend.js
```

## Deploy no Render
- Conecte este repositório ao Render.com como Web Service
- Defina `MP_ACCESS_TOKEN` nas variáveis de ambiente
- Pronto!