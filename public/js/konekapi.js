const result = fetch('https://api.themoviedb.org/3/movie/popular?api_key=6f5c15a5026f574a44ea16fcbc73b0c6&language=en-US&page=1').then(res=>res.json());

console.log(result);
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6f5c15a5026f574a44ea16fcbc73b0c6';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const MOVIE_ENDPOINT = id => `${API_URL}movie/${id}?api_key=${API_KEY}`;
const CREDITS_ENDPOINT = id => `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';
  
  const fetchMovies = async (movies, loadMore, searchTerm) => {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${
          loadMore ? movies.currentPage + 1 : 1
        }`
      : `${POPULAR_BASE_URL}&page=${loadMore ? movies.currentPage + 1 : 1}`;
  
    const result = await (await fetch(endpoint)).json();
          
    return {
      ...movies,
      movies: loadMore
        ? [...movies.movies, ...result.results]
        : [...result.results],
      heroImage: movies.heroImage || result.results[0],
      currentPage: result.page,
      totalPages: result.total_pages,
    };
  };

  const fetchMovie = async movieId => {
    const endpoint = MOVIE_ENDPOINT(movieId);
    const creditsEndpoint = CREDITS_ENDPOINT(movieId);
  
    const result = await (await fetch(endpoint)).json();
    const creditsResult = await (await fetch(creditsEndpoint)).json();
  
    const directors = creditsResult.crew.filter(
      member => member.job === 'Director'
    );
    console.log(endpoint);
    return {
      ...result,
      actors: creditsResult.cast,
      directors
    }
  }
  
  // Convert time to hours and minutes
const calcTime = time => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };
  // Convert a number to money formatting
   const convertMoney = money => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
    return formatter.format(money);
  };