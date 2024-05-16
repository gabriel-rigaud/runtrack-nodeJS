const http = require('http');

// Créer le serveur
const server = http.createServer((req, res) => {
    // Définir le code de réponse et le type de contenu
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Envoyer la réponse avec le contenu "Hello World!"
    res.end('Hello World!\n');
});

// Écouter sur le port 8888
const port = 8888;
server.listen(port, () => {
    console.log(`Le serveur est démarré et écoute sur le port ${port}`);
    console.log("Bravo, vous avez créé votre premier serveur web avec Node.js.");
});
