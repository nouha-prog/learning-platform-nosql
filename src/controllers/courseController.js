// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Un contrôleur gère la logique métier derrière une action spécifique, telle que la création, la mise à jour ou la suppression d'un élément.
// Une route, quant à elle, définit l'URL et la méthode HTTP (GET, POST, PUT, DELETE) qui déclenche l'appel du contrôleur correspondant.
// En d'autres termes, la route est responsable de la gestion des requêtes HTTP, tandis que le contrôleur implémente la logique de traitement de ces requêtes.


// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
// Séparer la logique métier des routes permet de rendre le code plus modulaire, réutilisable et facile à maintenir. 
// Cela permet également de mieux organiser le code en suivant une architecture MVC (Modèle-Vue-Contrôleur), 
// où les routes sont responsables des requêtes HTTP, et les contrôleurs gèrent la logique métier, rendant ainsi l'application plus claire et évolutive.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
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

    // Sauvegarder le cours dans la base de données MongoDB
    const result = await mongoService.insertOne('courses', course);

    // Vérifier si l'insertion a réussi
    if (result.insertedId) {
      // Mettre à jour le cache Redis (si nécessaire)
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

// Export des contrôleurs
module.exports = {
  createCourse, // Exporter la fonction de création du cours
};
