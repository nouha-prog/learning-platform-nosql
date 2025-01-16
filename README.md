# Projet de fin de module NoSQL

Learning Platform Project

Description

Ce projet est une plateforme d'apprentissage utilisant Node.js, Express, MongoDB, et Redis. L'application est structurée pour suivre les bonnes pratiques de modularité et de maintenance du code, avec une séparation claire des routes, des contrôleurs, et des services.

# Installation et lancement du projet

# Prérequis

Node.js (version 18 ou supérieure recommandée)

MongoDB

Redis

Étapes

# Clonez ce dépôt sur votre machine locale :

git clone <URL_du_dépôt>

# Installez les dépendances avec npm :

npm install

# Configurez les variables d'environnement en créant un fichier .env à la racine du projet :

MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learningplatform
REDIS_URI=redis://localhost:6379
PORT=3001

# Lancez le projet en mode développement avec nodemon :

npm start

Le serveur sera accessible sur http://localhost:3001.

# Structure du projet

Voici la structure du projet :

learning-platform
├── src
│   ├── config
│   │   ├── db.js               # Connexion à MongoDB
│   │   └── env.js              # Variables d'environnement
│   ├── controllers
│   │   └── courseController.js # Logique métier pour les cours
│   ├── routes
│   │   ├── courseRoutes.js     # Routes des cours
│   │   └── studentRoutes.js    # Routes des étudiants
│   ├── services
│   │   ├── mongoService.js     # Service pour MongoDB
│   │   └── redisService.js     # Service pour Redis
│   └── app.js                  # Point d'entrée de l'application
├── .env                        # Variables d'environnement (ignoré par Git)
├── .gitignore                  # Fichiers à ignorer par Git
├── package.json                # Dépendances du projet
└── README.md                   # Documentation

# Choix techniques

Express.js : Framework minimaliste pour créer des API REST.

MongoDB : Base de données NoSQL pour stocker des informations sur les cours et les étudiants.

Redis : Utilisé pour la mise en cache afin d'améliorer les performances.

Structure modulaire : Organisation en fichiers pour séparer les routes, contrôleurs, et services.

# Réponses aux questions posées dans les commentaires

# Que se passe-t-il si une variable requise est manquante ?

Si une variable d'environnement requise est manquante, l'application échouera lors du démarrage. Cela peut entraîner des erreurs dans la logique métier, des connexions échouées à la base de données ou une défaillance dans la configuration d'un service.

# Quelle est la différence entre un contrôleur et une route ?

Un contrôleur gère la logique métier, tandis qu'une route définit l'URL et la méthode HTTP qui appelle ce contrôleur.

Pourquoi séparer la logique métier des routes ?

Cela rend le code modulaire, réutilisable et plus facile à maintenir.

# Pourquoi séparer les routes dans différents fichiers ?

Cela permet de mieux organiser les fonctionnalités et de faciliter la gestion du code.

Comment organiser les routes de manière cohérente ?

Organisez les routes en fonction des fonctionnalités. Par exemple : courseRoutes.js pour les cours, studentRoutes.js pour les étudiants.

# Pourquoi créer des services séparés ?

Les services séparés permettent de réutiliser la logique métier, de réduire la duplication du code et de rendre l'application testable.

# Comment gérer efficacement le cache avec Redis ?

Définir un TTL (temps d'expiration), utiliser des clés explicites et éviter les données inutiles.

# Quelles sont les bonnes pratiques pour les clés Redis ?

Utilisez des préfixes et des noms explicites pour éviter les collisions.
 Mettre en place un TTL approprié pour éviter le stockage inutile de données obsolètes.

# Comment organiser le point d'entrée de l'application ?

Centralisez les connexions, les middlewares, et les routes dans un fichier principal tel que app.js.

# Quelle est la meilleure façon de gérer le démarrage de l'application ?

Utilisez une fonction asynchrone pour initialiser les bases de données, les middlewares et les routes, et gérez proprement les erreurs.

# Tests

Pour tester l'API, lancez le serveur et utilisez un outil comme Postman ou cURL pour envoyer des requêtes. Par exemple :

GET : http://localhost:3001/courses pour récupérer les cours.

POST : http://localhost:3001/courses pour ajouter un nouveau cours.

# CODES AVEC TODO : 
# code : db.js : 
 // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries

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

# code env.js : 
// Importation du package dotenv pour charger les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI',
  'PORT'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`La variable d'environnement ${envVar} est manquante. Veuillez la définir dans le fichier .env.`);
    }
  });
  console.log('Toutes les variables d\'environnement requises sont définies.');
}

// Appel de la fonction de validation des variables d'environnement
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',  // URI MongoDB 
    dbName: process.env.MONGODB_DB_NAME || 'learningplatform'  // Nom de la base de données 
  },
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost:6379'  // URI Redis 
  },
  port: process.env.PORT || 3001  // Port du serveur, par défaut 3000
};

# code courseController : 
const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Fonction pour créer un cours
async function createCourse(req, res) {
  try {
    const { name, description, teacherId } = req.body; // Récupérer les données du cours envoyées dans la requête

    // Vérifier si les données nécessaires sont présentes
    if (!name || !description || !teacherId) {
      return res.status(400).json({ message: "Nom, description et identifiant de l'enseignant sont requis." });
    }

    // Créer un nouvel objet de cours
    const course = {
      name,
      description,
      teacherId: new ObjectId(teacherId), // Assurer la validité de l'ID
      createdAt: new Date(),
    };

    console.log("Création du cours avec les données:", course);

    // Sauvegarder le cours dans la base de données MongoDB
    const result = await mongoService.insertOne('courses', course);

    // Vérifier si l'insertion a réussi
    if (result.insertedId) {
      // Mettre à jour le cache Redis avec l'ID du cours
      redisService.set(`course:${result.insertedId}`, JSON.stringify(course));

      // Retourner une réponse positive
      return res.status(201).json({
        message: 'Cours créé avec succès',
        courseId: result.insertedId,
      });
    } else {
      return res.status(500).json({ message: 'Erreur lors de la création du cours' });
    }
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Fonction pour récupérer tous les cours
async function getCourses(req, res) {
  try {
    // Récupérer tous les cours depuis la collection 'courses' de MongoDB
    const courses = await mongoService.findAll('courses');  // Appel à un service qui récupère tous les cours

    // Vérifier si des cours existent
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Aucun cours trouvé' });
    }

    // Retourner les cours avec une réponse 200 (OK)
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Exporter les fonctions
module.exports = {
  createCourse, // Exporter la fonction pour la rendre accessible aux routes
  getCourses,  // Assurez-vous que la fonction getCourses est bien exportée
};
# code courseRoutes:
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Fonction pour créer un cours
async function createCourse(req, res) {
  try {
    const { name, description, teacherId } = req.body;
    if (!name || !description || !teacherId) {
      return res.status(400).json({ message: "Nom, description et identifiant de l'enseignant sont requis." });
    }
    const course = {
      name,
      description,
      teacherId: new ObjectId(teacherId),
      createdAt: new Date(),
    };
    console.log("Création du cours avec les données:", course);
    const result = await mongoService.insertOne('courses', course);
    if (result.insertedId) {
      redisService.set(`course:${result.insertedId}`, JSON.stringify(course));
      return res.status(201).json({
        message: 'Cours créé avec succès',
        courseId: result.insertedId,
      });
    } else {
      return res.status(500).json({ message: 'Erreur lors de la création du cours' });
    }
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Fonction pour récupérer tous les cours
async function getCourses(req, res) {
  try {
    const courses = await mongoService.findAll('courses');
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Aucun cours trouvé' });
    }
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Définir les routes
router.post('/courses', createCourse);
router.get('/courses', getCourses);

// Exporter le routeur
module.exports = router;

# code mongoService.js :
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

# code redisService.js : 
const redis = require('redis');
const client = redis.createClient();  // Initialisation du client Redis

 // TODO: Implémenter une fonction générique de cache
// Fonction utilitaire pour mettre en cache des données dans Redis
async function cacheData(key, data, ttl = 3600) { // TTL par défaut à 1 heure
  return new Promise((resolve, reject) => {
    // Convertir les données en chaîne JSON avant de les stocker dans Redis
    const stringifiedData = JSON.stringify(data);
    
    // Utiliser la méthode SET de Redis avec un TTL
    client.setex(key, ttl, stringifiedData, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

// TODO: Exporter les fonctions utilitaires
// Export des services
module.exports = {
  cacheData, // Exporter la fonction de mise en cache
};

# code app.js : 
const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Connexion à MongoDB et Redis
    console.log('Tentative de connexion aux bases de données...');
    await db.connectMongo();
    await db.connectRedis();

    console.log('Bases de données connectées avec succès.');

    // Configuration des middlewares
    app.use(express.json());

    // Montage des routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);

    // Démarrage du serveur
 

    const port = config.port || 3001;
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});


  } catch (error) {
    console.error('Échec du démarrage du serveur:', error);
    await db.disconnectMongo();
    await db.disconnectRedis();
    process.exit(1);
  }
}

// Gestion propre de l'arrêt de l'application
process.on('SIGTERM', async () => {
  console.log('Signal SIGTERM reçu, arrêt du serveur en cours...');
  await db.disconnectMongo();
  await db.disconnectRedis();
  process.exit(0);
});

// Démarrer le serveur
startServer();

# screen de l´installation de redis / mongodb : 
![picture](screens/Capture1.png)
(screens/Capture2.png)

# screen du lancement de nmp / screen postman de test API : 
(screens/Picture3.PNG)
(screens/Picture4.png)
(screens/Picture5.png)

Historique des commits

Chaque fonctionnalité a été ajoutée avec des messages de commit clairs pour refléter les modifications apportées.

### Merci d'utiliser cette plateforme d'apprentissage !
