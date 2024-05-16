const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = `${movie.title}`;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    const releaseDate = document.createElement('small');
    releaseDate.classList.add('text-muted');
    releaseDate.appendChild(
      document.createTextNode(`Release: ${movie.release_date}`)
    );
    cardText.appendChild(releaseDate);

    const link = document.createElement('a');
    link.setAttribute('href', `movie-details.html?id=${movie.id}`);

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('alt', `${movie.title}`);
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
    link.appendChild(img);

    const CardBody = document.createElement('div');
    CardBody.classList.add('card-body');
    CardBody.appendChild(cardTitle);
    CardBody.appendChild(cardText);

    divCard.appendChild(link);
    divCard.appendChild(CardBody);

    document.getElementById('popular-movies').appendChild(divCard);
  });
}

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = '967c935dc81716e47682ad65c5f49d3a';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-us`
  );
  const data = await response.json();

  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('TV Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Show Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
