const http = require('http');
const fs = require('fs');
const path = require('path');

// Créer le serveur
const server = http.createServer((req, res) => {
    // Récupérer l'URL demandée
    const url = req.url;

    // Vérifier l'URL et renvoyer le fichier correspondant
    let fileName = '';
    if (url === '/') {
        fileName = 'index.js';
    } else if (url === '/about') {
        fileName = 'about.html';
    } else {
        fileName = 'error.html';
    }

    // Lire le contenu du fichier correspondant
    const filePath = path.join(__dirname, fileName);
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
});
