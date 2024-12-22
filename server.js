const path = require('path');
const express = require('express');
const hbs = require('hbs');
const movieUtils = require('./utils/movie.js'); 

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'templates/views');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

// Home page
app.get('', (req, res) => {
    res.render('index', {
        title: "Tyler's Cinema Suggestions",
        name: 'Tyler Krug' 
    });
});

// Gets similar movies 
app.get('/similar/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const similarMovies = await movieUtils.fetchSimilarMovies(movieId); 
        res.send(similarMovies); 
    } catch (error) {
        res.send({ error: 'Could not fetch similar movies.' });
    }
});

// Search for a movie
app.get('/search', async (req, res) => {
    const movieTitle = req.query.title; 
    if (!movieTitle) {
        return res.send({ error: 'You must provide a movie title.' });
    }

    try {
        const similarMovies = await movieUtils.searchMovie(movieTitle); 
        res.send(similarMovies); 
    } catch (error) {
        res.send({ error: error.message }); 
    }
});

// Handles non-existent pages
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tyler Krug',
        errorMessage: 'Page not found'
    });
});

// Starts server 
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});