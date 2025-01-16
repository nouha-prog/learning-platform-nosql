const express = require('express');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne correctement.');
});

app.listen(port, () => {
  console.log(`Serveur de test en cours d'exécution sur le port ${port}`);
});
