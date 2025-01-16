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

// Importer le contrôleur qui contient la logique pour gérer les cours
const { getCourses, createCourse } = require('../controllers/courseController');

// Route GET pour récupérer tous les cours
router.get('/courses', getCourses);

// Route POST pour créer un nouveau cours
router.post('/courses', createCourse);

module.exports = router;


