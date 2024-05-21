const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

// Route GET pour récupérer tous les étudiants
router.get('/students', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const students = await db.collection('students').find().toArray();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route POST pour ajouter un étudiant à la collection
router.post('/students', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('students').insertOne(req.body);
        res.status(201).json({ message: 'Student added successfully', student: result.ops[0] });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route DELETE pour supprimer un étudiant de la collection en fonction de son ID
router.delete('/student/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('students').deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
