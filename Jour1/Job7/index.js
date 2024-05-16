const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Récupérer le contenu du fichier de manière asynchrone
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        return;
    }
    console.log("Contenu du fichier :", data);
});
