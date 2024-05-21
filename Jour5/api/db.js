const { MongoClient } = require('mongodb');

const uri = 'mongodb://10.211.55.21:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('LaPlateforme');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };