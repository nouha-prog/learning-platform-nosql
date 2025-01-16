
// Question: Pourquoi créer des services séparés ?
// Réponse: 
// Les services séparés permettent d'organiser et de réutiliser la logique métier dans différentes parties de l'application,
// de réduire la duplication de code et de rendre le code plus modulaire, testable et maintenable.
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // Votre URI MongoDB
const dbName = 'learningPlatform'; // Nom de la base de données

// Connexion à MongoDB
async function getDbConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

// Insérer un document dans une collection
async function insertOne(collection, data) {
  const db = await getDbConnection();
  const result = await db.collection(collection).insertOne(data);
  return result;
}

// Récupérer tous les documents d'une collection
async function findAll(collection) {
  const db = await getDbConnection();
  const result = await db.collection(collection).find().toArray();  // Utilisation de find() et toArray() pour récupérer tous les documents
  return result;
}

module.exports = {
  insertOne,
  findAll,  // N'oublie pas d'exporter la fonction findAll
};
