
// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
// La validation des variables d'environnement est importante car elle permet de s'assurer que 
// toutes les informations nécessaires sont présentes avant de démarrer l'application.
// Si une variable manquante empêche une connexion à la base de données ou d'autres services,
// cela pourrait entraîner des erreurs imprévues en cours d'exécution. La validation garantit 
// que l'application est correctement configurée avant son démarrage.

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse :
// Si une variable d'environnement requise est manquante, l'application échouera lors du démarrage.
// Cela peut entraîner des erreurs dans la logique métier, des connexions échouées à la base de données,
// ou une défaillance dans la configuration d'un service, ce qui pourrait compromettre le bon fonctionnement de l'application.

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
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',  // URI MongoDB (valeur par défaut si non définie)
    dbName: process.env.MONGODB_DB_NAME || 'learningplatform'  // Nom de la base de données (valeur par défaut si non définie)
  },
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost:6379'  // URI Redis (valeur par défaut si non définie)
  },
  port: process.env.PORT || 3000  // Port du serveur, par défaut 3000
};
