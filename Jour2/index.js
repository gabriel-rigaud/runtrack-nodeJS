// Importer les modules nécessaires
const createServer = require('./server');
const express = require('express');
const routes = require('./routes');

// Créer une instance d'Express
const app = express();

// Utiliser les routes définies dans routes.js
app.use('/', routes);

// Définir le port
const port = 8888;

// Créer et démarrer le serveur
const server = createServer();

// Écouter sur le port spécifié
server.listen(port, () => {
    console.log(`Le serveur est démarré et écoute sur le port ${port}`);
});
