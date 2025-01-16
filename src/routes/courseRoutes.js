// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Séparer les routes dans différents fichiers permet de rendre le code plus modulaire et facile à maintenir. 
// Cela permet aussi de mieux organiser les fonctionnalités du projet en les isolant dans des fichiers dédiés, 
// ce qui facilite la gestion des fichiers et la compréhension du code.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 
// Les routes doivent être organisées en fonction de la fonctionnalité ou du domaine auquel elles appartiennent. 
// Par exemple, les routes liées aux cours peuvent être dans un fichier `courseRoutes.js`, celles liées aux utilisateurs dans un fichier `userRoutes.js`, etc.
// Cette organisation permet une gestion claire et facilite la navigation entre les différentes parties du projet.

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


