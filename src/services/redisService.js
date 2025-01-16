
  // Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Pour gérer efficacement le cache avec Redis, il est important de définir un temps d'expiration (TTL) pour chaque élément mis en cache,
// d'utiliser des clés appropriées et d'éviter la surcharge du cache avec des données non nécessaires. L'utilisation de Redis en tant que cache
// permet de réduire la charge sur les bases de données principales et d'améliorer les performances des applications.


// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
// - Utiliser des préfixes pour les clés afin de les organiser (ex : "user:123" pour un utilisateur avec l'ID 123).
// - Utiliser des clés avec des noms uniques et explicites pour éviter les collisions.
// - Mettre en place un TTL approprié pour éviter le stockage inutile de données obsolètes.

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
