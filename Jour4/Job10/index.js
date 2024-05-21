const { MongoClient } = require('mongodb');

// URL de connexion à la base de données MongoDB
const url = 'mongodb://10.211.55.21:27017';
const dbName = 'LaPlateforme'; // Nom de votre base de données
const collectionName = 'student'; // Nom de votre collection

// Contraintes de validation pour la collection 'student'
const validationRules = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['lastname', 'firstname', 'year'],
            properties: {
                lastname: {
                    bsonType: 'string',
                    description: 'Nom de famille de l\'étudiant'
                },
                firstname: {
                    bsonType: 'string',
                    description: 'Prénom de l\'étudiant'
                },
                year: {
                    bsonType: 'string',
                    description: 'Année d\'études de l\'étudiant'
                }
            }
        }
    }
};

// Connexion à MongoDB
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function recreateCollectionWithValidation() {
    try {
        await client.connect();
        console.log('Connecté à la base de données');

        const db = client.db(dbName);

        // Supprimer la collection existante
        await db.dropCollection(collectionName);

        // Recréer la collection avec les contraintes de validation
        await db.createCollection(collectionName, validationRules);
        console.log('Collection "student" recréée avec succès avec les contraintes de validation.');
    } catch (err) {
        console.error('Erreur lors de la recréation de la collection avec les contraintes de validation :', err);
    } finally {
        await client.close();
    }
}

recreateCollectionWithValidation();
