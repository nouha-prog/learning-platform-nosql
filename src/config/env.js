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

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
 // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
function validateEnv() {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`La variable d'environnement ${envVar} est manquante. Veuillez la définir dans le fichier .env.`);
    }
  });
}
// Appel de la fonction de validation des variables d'environnement
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};
