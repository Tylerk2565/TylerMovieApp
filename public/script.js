const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const moviesContainer = document.getElementById('movies');

// Event listener for the search button, if there is an empty input an alert will pop up
// While searching there will be a Loading message
// We then fetch our data and use a forEach to create a element to append to our page
searchButton.addEventListener('click', async () => {
    const movieTitle = movieInput.value.trim();
    if (!movieTitle) {
        alert('Please enter a movie title to search for.');
        return;
    }

    moviesContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/search?title=${encodeURIComponent(movieTitle)}`);
        const data = await response.json();

        if (data.error) {
            moviesContainer.innerHTML = data.error; 
        } else {
            moviesContainer.innerHTML = '';
            data.forEach(movie => {
                const movieElement = `
                    <div class="movie">
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>
                    </div>
                `;
                moviesContainer.innerHTML += movieElement;
            });
        }
    } catch (error) {
        moviesContainer.innerHTML = 'An error occurred while fetching movies.';
        console.error('Error fetching movies:', error);
    }
});