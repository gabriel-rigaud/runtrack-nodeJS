const http = require('http');
const fs = require('fs');
const path = require('path');

// Fonction pour créer et démarrer le serveur
function createServer() {
    // Créer le serveur
    const server = http.createServer((req, res) => {
        // Récupérer l'URL demandée
        const url = req.url;

        // Vérifier l'URL et renvoyer le fichier correspondant
        let fileName = '';
        if (url === '/') {
            fileName = 'index.html';
        } else {
            fileName = 'error.html';
        }

        // Lire le contenu du fichier correspondant
        const filePath = path.join(__dirname, fileName);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err); // Ajoutez ce log pour déboguer les erreurs
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erreur interne du serveur');
                return;
            }

            // Envoyer le contenu du fichier en tant que réponse
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    });

    // Retourner le serveur
    return server;
}

// Exporter la fonction createServer
module.exports = createServer;
