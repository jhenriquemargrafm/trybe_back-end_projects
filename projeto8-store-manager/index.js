const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(bodyParser.json());

// Rotas
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Rodando na porta ${PORT}`);
});
