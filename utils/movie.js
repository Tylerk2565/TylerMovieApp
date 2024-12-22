const axios = require('axios');

// Function to fetch similar movies based on movie ID
const fetchSimilarMovies = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=5a2ab6434b46666207ac759bc3fa9685`);
    return response.data.results; 
};

// Function to search for a movie by title and return its ID
const searchMovie = async (movieTitle) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5a2ab6434b46666207ac759bc3fa9685&query=${encodeURIComponent(movieTitle)}`);
    
    // Check if any movies were found and gets the id
    if (response.data.results.length > 0) {
        const movieId = response.data.results[0].id; 
        const similarMovies = await fetchSimilarMovies(movieId);
        return similarMovies; 
    } else {
        throw new Error('No movies found with that title.'); 
    }
};

module.exports = {
    fetchSimilarMovies,
    searchMovie
};