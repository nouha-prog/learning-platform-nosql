
// Question: Pourquoi créer des services séparés ?
// Réponse: 
// Les services séparés permettent d'organiser et de réutiliser la logique métier dans différentes parties de l'application,
// de réduire la duplication de code et de rendre le code plus modulaire, testable et maintenable.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
  // TODO: Implémenter une fonction générique de recherche par ID
async function findOneById(collection, id) {
  try {
    // Vérifie si l'id est valide
    if (!ObjectId.isValid(id)) {
      throw new Error('ID invalide');
    }

    // Recherche le document dans la collection spécifiée
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    console.error('Erreur lors de la recherche par ID:', err);
    throw err;
  }
}

// Export des services
 // TODO: Exporter les fonctions utilitaires
module.exports = {
  findOneById,  // Export de la fonction utilitaire
};
