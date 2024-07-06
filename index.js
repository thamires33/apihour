const express = require('express');
const app = express();
const port = 3000;

function saudacaoPorHorario(horario) {
  const hour = parseInt(horario.split(':')[0], 10);
  if (hour >= 5 && hour < 12) {
    return "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

app.use(express.json());
app.use(express.static('public')); 

app.post('/saudacao', (req, res) => {
  const { horario } = req.body;
  if (!horario) {
    return res.status(400).json({ error: "Horário não fornecido." });
  }
  
  const saudacao = saudacaoPorHorario(horario);
  res.json({ saudacao });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}

module.exports = app; 
