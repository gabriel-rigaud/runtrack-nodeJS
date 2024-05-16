const url = require('url');

// Déclaration de la constante URL
const URL = "https://www.google.com&search=nodejs";

// Récupérer le protocole utilisé
const parsedUrl = url.parse(URL);
console.log("Protocole utilisé :", parsedUrl.protocol);

// Récupérer le nom d'hôte
console.log("Nom d'hôte :", parsedUrl.hostname);

// Récupérer les paramètres de l'URL
const params = parsedUrl.search ? parsedUrl.search.substring(1) : "Aucun paramètre";
console.log("Paramètres de l'URL :", params);

// Reformater l'URL en une nouvelle URL valide en modifiant le nom d'hôte par "www.laplateforme.io"
parsedUrl.host = "www.laplateforme.io";

// Ajouter à cette nouvelle URL un paramètre
parsedUrl.search += "&newParam=newValue";

// Générer la nouvelle URL
const newURL = url.format(parsedUrl);

// Afficher la nouvelle URL dans le terminal
console.log("Nouvelle URL :", newURL);
