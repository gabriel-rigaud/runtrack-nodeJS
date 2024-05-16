const http = require('http');
const fs = require('fs');
const path = require('path');

// Créer le serveur
const server = http.createServer((req, res) => {
    // Lire le contenu du fichier index.js
    const filePath = path.join(__dirname, 'index.js');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erreur interne du serveur');
            return;
        }

        // Envoyer le contenu du fichier en tant que réponse
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

// Écouter sur le port 8888
const port = 8888;
server.listen(port, () => {
    console.log(`Le serveur est démarré et écoute sur le port ${port}`);
    console.log("Ouvrez un navigateur à l'adresse http://localhost:8888 pour accéder à votre page web.");
});
