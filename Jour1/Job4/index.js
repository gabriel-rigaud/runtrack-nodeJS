const fs = require('fs');
const path = require('path');

// Chemin absolu du répertoire courant
const currentDirectory = __dirname;

// Lecture du contenu du répertoire courant
fs.readdir(currentDirectory, (err, files) => {
    if (err) {
        console.error("Erreur lors de la lecture du répertoire :", err);
        return;
    }

    // Filtrer les dossiers parmi les fichiers trouvés
    const directories = files.filter(file => {
        const fullPath = path.join(currentDirectory, file);
        try {
            const stats = fs.statSync(fullPath);
            return stats.isDirectory();
        } catch (error) {
            console.error("Erreur lors de la vérification du fichier :", error);
            return false;
        }
    });

    // Afficher les dossiers trouvés
    console.log("Dossiers présents dans le répertoire courant :");
    directories.forEach(directory => {
        console.log(directory);
    });
});
