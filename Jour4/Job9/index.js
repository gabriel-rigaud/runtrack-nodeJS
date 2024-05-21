const { MongoClient, ObjectId } = require('mongodb');

// URL de connexion à la base de données MongoDB
const url = 'mongodb://10.211.55.21:27017';
const dbName = 'LaPlateforme'; // Nom de votre base de données
const collectionName = 'student'; // Nom de votre collection

// ID de l'étudiant à supprimer
const studentIdToDelete = 'Votre_ID_Etudiant'; // Remplacez par l'ID de l'étudiant à supprimer

// Connexion à MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteStudent() {
    try {
        await client.connect();
        console.log('Connecté à la base de données');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Suppression de l'étudiant
        const result = await collection.deleteOne({ _id: ObjectId(studentIdToDelete) });

        console.log(`${result.deletedCount} document(s) supprimé(s).`);
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'étudiant :', err);
    } finally {
        await client.close();
    }
}

deleteStudent();
