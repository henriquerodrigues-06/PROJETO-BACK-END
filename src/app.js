require('dotenv').config();
const express = require('express');
const routineRoutes = require('./routes/routineRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', routineRoutes);

app.listen(PORT);

console.log('Aplicação rodando na porta ' + PORT);