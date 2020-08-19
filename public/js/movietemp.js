const movies = {movies: []};
// console.log(movies);
(function hero(){
    return{
      data: async function(){
        const URL_API = 'https://api.themoviedb.org/3/movie/popular?api_key=6f5c15a5026f574a44ea16fcbc73b0c6&page=1'; 
        console.log('cekk')
        try {
                movies = await fetchMovies(movies, URL_API);
                console.log(movies);
                console.log('Halooo');
            } catch (err) {
                console.log('error');
            }

        async function fetchMovies(movies, url) {
            const result = await (await fetch(url)).json();
            console.log(result)
            return {
                ...movies,
                movies: [...result.results],
                heroImage: movies.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }
        }
        

        return {
            movies: movies,
            
        }
      }
    }
})();
