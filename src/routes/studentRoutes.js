const express = require('express');
const router = express.Router();

// Route pour obtenir tous les étudiants
router.get('/students', (req, res) => {
    res.send('Liste des étudiants');
});

// Route pour obtenir un étudiant par son ID
router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    res.send(`Détails de l'étudiant avec l'ID ${studentId}`);
});

// Route pour créer un nouvel étudiant
router.post('/students', (req, res) => {
    const newStudent = req.body;
    res.send(`Nouvel étudiant créé : ${JSON.stringify(newStudent)}`);
});

// Route pour mettre à jour un étudiant par son ID
router.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const updatedStudent = req.body;
    res.send(`Étudiant avec l'ID ${studentId} mis à jour : ${JSON.stringify(updatedStudent)}`);
});

// Route pour supprimer un étudiant par son ID
router.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    res.send(`Étudiant avec l'ID ${studentId} supprimé`);
});

module.exports = router;
