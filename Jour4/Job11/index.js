const { MongoClient } = require('mongodb');
const fs = require('fs');

// URL de connexion à la base de données MongoDB
const url = 'mongodb://10.211.55.21:27017';
const dbName = 'LaPlateforme'; // Nom de votre base de données
const collectionName = 'student'; // Nom de votre collection

// Nom du fichier JSON d'export
const exportFileName = 'students.json';

// Connexion à MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function exportDataToJson() {
    try {
        await client.connect();
        console.log('Connecté à la base de données');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Export des données de la collection dans un fichier JSON
        const cursor = collection.find();
        const results = await cursor.toArray();

        fs.writeFileSync(exportFileName, JSON.stringify(results, null, 2));
        console.log(`Données exportées avec succès dans le fichier "${exportFileName}"`);
    } catch (err) {
        console.error('Erreur lors de l\'export des données :', err);
    } finally {
        await client.close();
    }
}

exportDataToJson();
