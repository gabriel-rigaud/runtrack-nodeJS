const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier data.json
const dataPath = path.join(__dirname, 'data.json');

// Fonction pour lire les données à partir de data.json
function readDataFromFile() {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
}

// Fonction pour écrire les données dans data.json
function writeDataToFile(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Récupérer toutes les tâches de la liste
router.get('/tasks', (req, res) => {
    const data = readDataFromFile();
    res.json(data.tasks);
});

// Créer une nouvelle tâche
router.post('/tasks', (req, res) => {
    const data = readDataFromFile();
    const newTask = req.body; // Supposons que le corps de la requête contient les données de la nouvelle tâche
    newTask.id = data.tasks.length + 1; // Génération automatique d'un nouvel ID
    data.tasks.push(newTask);
    writeDataToFile(data);
    res.status(201).json(newTask);
});

// Mettre à jour une tâche existante
router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const data = readDataFromFile();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).send('Tâche non trouvée');
        return;
    }
    const updatedTask = req.body; // Supposons que le corps de la requête contient les données mises à jour de la tâche
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedTask };
    writeDataToFile(data);
    res.json(data.tasks[taskIndex]);
});

// Supprimer une tâche existante
router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const data = readDataFromFile();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).send('Tâche non trouvée');
        return;
    }
    const deletedTask = data.tasks.splice(taskIndex, 1);
    writeDataToFile(data);
    res.json(deletedTask);
});

module.exports = router;
