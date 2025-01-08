// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
/* Reponse :
  Un module séparé pour les connexions aux bases de données est :
  - Réutilisable : Utilisé partout sans duplication de code.
  - Maintenable : Modifications faciles en un seul endroit.
  - Organisé : Respecte la séparation des responsabilités.
  - Gestion des erreurs : Centralise le traitement des erreurs.
  - Testable : Facilite les tests avec des connexions simulées.
*/

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 
/*
  Pour gérer proprement la fermeture des connexions :
  - Toujours utiliser des blocs `try/catch` pour capturer les erreurs éventuelles lors de la fermeture.
  - Utiliser des fonctions comme `close()` ou `disconnect()` adaptées à la base de données ou aux services.
  - Assurer une fermeture propre après l'exécution des requêtes ou à la fin du processus.
  - Utiliser des événements ou des hooks pour fermer automatiquement les connexions à la fin du programme.
*/
const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = await MongoClient.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = mongoClient.db(config.dbName);
    console.log('Connexion MongoDB réussie');
  } catch (error) {
    // TODO: Gérer les erreurs et implémenter les retries
    console.error('Erreur de connexion MongoDB:', error);
    throw error;
  }
}
async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  redisClient = redis.createClient(config.redisURI);

  redisClient.on('error', (error) => {
    // TODO: Gérer les erreurs et implémenter les retries
    console.error('Erreur de connexion Redis:', error);
  });

  redisClient.on('connect', () => {
    console.log('Connexion Redis réussie');
  });
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  mongoClient,
  redisClient,
  db
};
