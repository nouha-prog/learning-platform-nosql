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

// Variables pour les clients MongoDB et Redis
let mongoClient, redisClient, db;

// Connexion à MongoDB avec gestion des erreurs
async function connectMongo() {
  try {
    console.log('Tentative de connexion à MongoDB...');
    mongoClient = new MongoClient(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('Connexion MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
    throw error;
  }
}

// Connexion à Redis avec gestion des erreurs
async function connectRedis() {
  return new Promise((resolve, reject) => {
    redisClient = redis.createClient(config.redis.uri);

    redisClient.on('error', (error) => {
      console.error('Erreur de connexion Redis:', error);
      reject(error);
    });

    redisClient.on('connect', () => {
      console.log('Connexion Redis réussie');
      resolve(redisClient);
    });
  });
}

// Fonction pour fermer la connexion MongoDB proprement
async function disconnectMongo() {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('Connexion MongoDB fermée');
    }
  } catch (error) {
    console.error('Erreur lors de la fermeture de la connexion MongoDB:', error);
  }
}

// Fonction pour fermer la connexion Redis proprement
async function disconnectRedis() {
  try {
    if (redisClient) {
      redisClient.quit();
      console.log('Connexion Redis fermée');
    }
  } catch (error) {
    console.error('Erreur lors de la fermeture de la connexion Redis:', error);
  }
}

// Export des fonctions et des clients
module.exports = {
  connectMongo,
  connectRedis,
  disconnectMongo,
  disconnectRedis,
  getDb: () => db,
  mongoClient,
  redisClient
};


