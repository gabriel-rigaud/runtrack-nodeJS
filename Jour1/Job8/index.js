const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Récupérer le contenu du fichier de manière asynchrone
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        return;
    }

    // Parcourir les caractères et afficher une lettre sur deux
    let output = '';
    for (let i = 0; i < data.length; i += 2) {
        output += data[i];
    }

    // Afficher le résultat dans le terminal
    console.log("Contenu du fichier avec une lettre sur deux :", output);
});
