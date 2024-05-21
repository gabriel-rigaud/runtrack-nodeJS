const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route for handling 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
