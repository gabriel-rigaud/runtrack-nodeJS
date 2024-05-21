const { MongoClient } = require('mongodb');
const readline = require('readline');

// URL de connexion à la base de données MongoDB
const url = 'mongodb://10.211.55.21:27017';
const dbName = 'LaPlateforme'; // Nom de votre base de données
const collectionName = 'student'; // Nom de votre collection

// Créer une interface pour lire l'entrée utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Demander à l'utilisateur de saisir un numéro d'étudiant
rl.question('Veuillez saisir un numéro d\'étudiant : ', async (numero) => {
    const numeroSaisi = parseInt(numero, 10);

    if (isNaN(numeroSaisi)) {
        console.log('Veuillez saisir un numéro valide.');
        rl.close();
        return;
    }

    // Connexion à MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connecté à la base de données');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Filtrer les étudiants ayant un numéro supérieur à celui saisi
        const result = await collection.find({ "_id": { $gt: numeroSaisi } }).toArray();

        if (result.length > 0) {
            console.log('Étudiants trouvés :');
            console.log(result);
        } else {
            console.log('Aucun étudiant trouvé avec un numéro supérieur à celui saisi.');
        }
    } catch (err) {
        console.error('Erreur lors de la connexion à la base de données ou de l\'exécution de la requête', err);
    } finally {
        await client.close();
        rl.close();
    }
});
