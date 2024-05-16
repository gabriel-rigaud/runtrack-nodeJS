const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Nouveau contenu à écrire dans le fichier
const newContent = "Je manipule les fichiers avec un module node !";

// Écrire le nouveau contenu dans le fichier
fs.writeFile(filePath, newContent, (err) => {
    if (err) {
        console.error("Erreur lors de l'écriture dans le fichier :", err);
        return;
    }
    console.log("Le contenu du fichier a été modifié avec succès !");
});
