const { MongoClient } = require('mongodb');

// URL de connexion à votre base de données MongoDB
const uri = 'mongodb://10.211.55.21:27017';
// Nom de votre base de données
const dbName = 'LaPlateforme';

// Définition des schémas
const years = [
    { year: "Bachelor 1" },
    { year: "Bachelor 2" },
    { year: "Bachelor 3" }
];

const students = [
    { lastname: "LeBricoleur", firstname: "Bob", year_id: 1 },
    { lastname: "Doe", firstname: "John", year_id: 2 },
    { lastname: "Dupont", firstname: "Marine", year_id: 3 }
];

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// Fonction pour insérer les années dans la collection "year"
async function insertYears(db) {
    try {
        const yearsCollection = db.collection('year');
        const result = await yearsCollection.insertMany(years);
        console.log(`${result.insertedCount} years inserted successfully.`);
    } catch (error) {
        console.error("Error inserting years:", error);
    }
}

// Fonction pour insérer les étudiants dans la collection "student"
async function insertStudents(db) {
    try {
        const studentsCollection = db.collection('student');
        const result = await studentsCollection.insertMany(students);
        console.log(`${result.insertedCount} students inserted successfully.`);
    } catch (error) {
        console.error("Error inserting students:", error);
    }
}

// Fonction pour récupérer et afficher les étudiants avec leurs cursus
async function fetchStudentsWithYears(db) {
    try {
        const studentsCollection = db.collection('student');
        const result = await studentsCollection.aggregate([
            {
                $lookup: {
                    from: "year",
                    localField: "year_id",
                    foreignField: "_id",
                    as: "year"
                }
            },
            {
                $unwind: "$year"
            },
            {
                $project: {
                    _id: 0,
                    lastname: 1,
                    firstname: 1,
                    students_number: 1,
                    "year.year": 1
                }
            }
        ]).toArray();

        console.log("Students with their years:", result);
    } catch (error) {
        console.error("Error fetching students with years:", error);
    }
}

// Fonction principale
async function main() {
    const db = await connectToDatabase();

    // Insérez les années et les étudiants
    await insertYears(db);
    await insertStudents(db);

    // Récupérez et affichez les étudiants avec leurs cursus
    await fetchStudentsWithYears(db);
}

main();
