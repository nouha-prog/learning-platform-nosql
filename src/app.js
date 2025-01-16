
// Question: Comment organiser le point d'entrée de l'application ?
// Réponse :
// Le point d'entrée de l'application doit être organisé de manière à centraliser l'initialisation des différentes parties de l'application,
// telles que les connexions aux bases de données, les middlewares, les routes et le démarrage du serveur.
// Il est préférable d'avoir un fichier principal (généralement index.js ou app.js) qui s'occupe de l'initialisation et du démarrage du serveur.
// Cela permet de garder une structure claire et modulaire.

// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse :
// La meilleure façon de gérer le démarrage d'une application Node.js avec Express est d'utiliser une fonction asynchrone qui gère
// toutes les étapes importantes, telles que la connexion aux bases de données, la configuration des middlewares et des routes,
// ainsi que le démarrage du serveur. En cas d'erreur, il est recommandé d'implémenter une gestion d'erreur propre, par exemple en
// affichant un message d'erreur et en quittant proprement le processus.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db'); // Pour la connexion à la base de données

const courseRoutes = require('./routes/courseRoutes');


const app = express();

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Connexion à MongoDB et Redis
    console.log('Tentative de connexion aux bases de données...');
    await db.connectMongo();  // Connexion MongoDB
    await db.connectRedis();  // Connexion Redis

    console.log('Bases de données connectées avec succès.');

    // Configuration des middlewares
    app.use(express.json());

    // Montage des routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);

    // Démarrage du serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Le serveur fonctionne sur le port ${port}`);
    });

  } catch (error) {
    console.error('Échec du démarrage du serveur:', error);
    process.exit(1);  // Quitter le processus avec un code d'erreur en cas d'échec
  }
}

// Gestion propre de l'arrêt de l'application
process.on('SIGTERM', async () => {
  console.log('Signal SIGTERM reçu, arrêt du serveur en cours...');
  await db.disconnectMongo(); // Fermer la connexion MongoDB proprement
  await db.disconnectRedis(); // Fermer la connexion Redis proprement
  process.exit(0);  // Quitter le processus avec un code de succès
});

// Démarrer le serveur
startServer();

