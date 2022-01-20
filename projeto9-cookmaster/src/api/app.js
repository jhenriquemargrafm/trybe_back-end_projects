const bodyParser = require('body-parser');
const express = require('express');
const userRouter = require('./router/userRoutes');
const loginRouter = require('./router/loginRoutes');
const recipeRouter = require('./router/recipeRoutes');
const imageRouter = require('./router/imageRoute');

const app = express();
app.use(express.json());

app.use(express.static(`${__dirname}/../uploads`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);
app.use('/images', imageRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
