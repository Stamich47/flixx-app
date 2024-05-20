const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies currently (according to TMDB)
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

// Display 20 most popular shows currently (according to TMDB)

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = `${show.name}`;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    const releaseDate = document.createElement('small');
    releaseDate.classList.add('text-muted');
    releaseDate.appendChild(
      document.createTextNode(`Air Date: ${show.first_air_date}`)
    );
    cardText.appendChild(releaseDate);

    const link = document.createElement('a');
    link.setAttribute('href', `tv-details.html?id=${show.id}`);

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('alt', `${show.name}`);
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${show.poster_path}`
    );
    link.appendChild(img);

    const CardBody = document.createElement('div');
    CardBody.classList.add('card-body');
    CardBody.appendChild(cardTitle);
    CardBody.appendChild(cardText);

    divCard.appendChild(link);
    divCard.appendChild(CardBody);

    document.getElementById('popular-shows').appendChild(divCard);
  });
}

// Display movie details

async function displayMovieDetails() {
  const movieId = location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const divTop = document.createElement('div');
  divTop.classList.add('details-top');

  const imgDetails = document.createElement('div');

  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.setAttribute('alt', `${movie.title}`);
  img.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  );
  imgDetails.appendChild(img);
  divTop.appendChild(imgDetails);

  const movieInfoTop = document.createElement('div');
  movieInfoTop.appendChild(document.createElement('h2'));
  movieInfoTop.firstElementChild.innerText = `${movie.title}`;

  const movieRating = document.createElement('p');
  movieRating.appendChild(document.createElement('i'));
  movieRating.firstElementChild.classList.add('fas', 'fa-star', 'text-primary');
  const ratingText = document.createTextNode(
    ` ${movie.vote_average.toFixed(1)} / 10`
  );
  movieRating.appendChild(ratingText);
  movieInfoTop.appendChild(movieRating);

  const releaseDate = document.createElement('p');
  releaseDate.classList.add('text-muted');
  releaseDate.innerText = `Release Date: ${movie.release_date}`;
  movieInfoTop.appendChild(releaseDate);

  const movieOverview = document.createElement('p');
  movieOverview.innerText = `${movie.overview}`;
  movieInfoTop.appendChild(movieOverview);

  const movieGenreTitle = document.createElement('h5');
  movieGenreTitle.innerText = 'Genres';
  movieInfoTop.appendChild(movieGenreTitle);

  const genreList = document.createElement('ul');
  genreList.classList.add('list-group');

  movie.genres.forEach((genre) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${genre.name}`;
    genreList.appendChild(listItem);
  });
  movieInfoTop.appendChild(genreList);

  const movieLink = document.createElement('a');
  movieLink.setAttribute('href', `${movie.homepage}`);
  movieLink.setAttribute('target', '_blank');
  movieLink.classList.add('btn');
  movieLink.innerText = 'Visit Movie Homepage';
  movieInfoTop.appendChild(movieLink);
  divTop.appendChild(movieInfoTop);

  document.getElementById('movie-details').appendChild(divTop);

  const divBottom = document.createElement('div');
  divBottom.classList.add('details-bottom');

  const movieInfo = document.createElement('h2');
  movieInfo.innerText = 'Movie Info';
  divBottom.appendChild(movieInfo);

  const infoList = document.createElement('ul');

  infoList.innerHTML = `
  <li><span class="text-secondary">Budget:</span> ${addCommaToNumber(
    movie.budget
  )}</li>
  <li><span class="text-secondary">Revenue:</span> ${addCommaToNumber(
    movie.revenue
  )}</li>
  <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
  <li><span class="text-secondary">Status:</span> ${movie.status}</li>`;
  divBottom.appendChild(infoList);

  const companiesTitle = document.createElement('h4');
  companiesTitle.innerText = 'Production Companies';
  divBottom.appendChild(companiesTitle);

  const companiesList = document.createElement('div');
  companiesList.classList.add('list-group');
  companiesList.innerHTML = `${movie.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(', ')}`;
  divBottom.appendChild(companiesList);

  document.getElementById('movie-details').appendChild(divBottom);
}

// DIsplay Show Details

async function displayShowDetails() {
  const showId = location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const divTop = document.createElement('div');
  divTop.classList.add('details-top');

  const imgDetails = document.createElement('div');

  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.setAttribute('alt', `${show.name}`);
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${show.poster_path}`);
  imgDetails.appendChild(img);
  divTop.appendChild(imgDetails);

  const showInfoTop = document.createElement('div');
  showInfoTop.appendChild(document.createElement('h2'));
  showInfoTop.firstElementChild.innerText = `${show.name}`;

  const showRating = document.createElement('p');
  showRating.appendChild(document.createElement('i'));
  showRating.firstElementChild.classList.add('fas', 'fa-star', 'text-primary');
  const ratingText = document.createTextNode(
    ` ${show.vote_average.toFixed(1)} / 10`
  );
  showRating.appendChild(ratingText);
  showInfoTop.appendChild(showRating);

  const releaseDate = document.createElement('p');
  releaseDate.classList.add('text-muted');
  releaseDate.innerText = `Last Air Date: ${show.last_air_date}`;
  showInfoTop.appendChild(releaseDate);

  const showOverview = document.createElement('p');
  showOverview.innerText = `${show.overview}`;
  showInfoTop.appendChild(showOverview);

  const showGenreTitle = document.createElement('h5');
  showGenreTitle.innerText = 'Genres';
  showInfoTop.appendChild(showGenreTitle);

  const genreList = document.createElement('ul');
  genreList.classList.add('list-group');

  show.genres.forEach((genre) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${genre.name}`;
    genreList.appendChild(listItem);
  });
  showInfoTop.appendChild(genreList);

  const showLink = document.createElement('a');
  showLink.setAttribute('href', `${show.homepage}`);
  showLink.setAttribute('target', '_blank');
  showLink.classList.add('btn');
  showLink.innerText = 'Visit show Homepage';
  showInfoTop.appendChild(showLink);
  divTop.appendChild(showInfoTop);

  document.getElementById('show-details').appendChild(divTop);

  const divBottom = document.createElement('div');
  divBottom.classList.add('details-bottom');

  const showInfo = document.createElement('h2');
  showInfo.innerText = 'show Info';
  divBottom.appendChild(showInfo);

  const infoList = document.createElement('ul');

  infoList.innerHTML = `
  <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
  <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}
  </li>
  <li><span class="text-secondary">Status:</span> ${show.status}</li>`;
  divBottom.appendChild(infoList);

  const companiesTitle = document.createElement('h4');
  companiesTitle.innerText = 'Production Companies';
  divBottom.appendChild(companiesTitle);

  const companiesList = document.createElement('div');
  companiesList.classList.add('list-group');
  companiesList.innerHTML = `${show.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(', ')}`;
  divBottom.appendChild(companiesList);

  document.getElementById('show-details').appendChild(divBottom);
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Display Backdrop Function
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.2';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    const a = document.createElement('a');
    a.setAttribute('href', `movie-details.html?id=${movie.id}`);
    const img = document.createElement('img');
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
    img.setAttribute('alt', `${movie.title}`);
    a.appendChild(img);

    const headerSwiper = document.createElement('h4');
    headerSwiper.classList.add('swiper-rating');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-star', 'text-secondary');
    const ratingText = document.createTextNode(
      ` ${movie.vote_average.toFixed(1)} / 10`
    );
    headerSwiper.appendChild(icon);
    headerSwiper.appendChild(ratingText);

    div.appendChild(a);
    div.appendChild(headerSwiper);

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

// Swiper Initialize

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = '967c935dc81716e47682ad65c5f49d3a';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-us`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}
g;
function addCommaToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
