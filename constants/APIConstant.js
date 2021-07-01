const API_KEY = "d5f886808c26319f5cbefabd648541a0";
const BASE_URL = "https://api.themoviedb.org/3";

const APIConstant = {
  URL: {
    POPULAR_ON_NEXFLIX: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_ott_providers=8&vote_average.lte=10&sort_by=popularity.desc`,
    NEXTFLEX_ORIGINALS: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213&page=2`,
    TRENDING: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    TOP_RATED: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    ACTION_MOVIES: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    COMEDY_MOVIES: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    HORROR_MOVIES: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    ROMANCE_MOVIES: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    DOCUMENTARIES: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  }
};

export default APIConstant;