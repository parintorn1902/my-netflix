const BASE_URL = process.env.SERVICE_URL;

const APIConstant = {
  URL: {
    POPULAR_ON_NEXFLIX: `${BASE_URL}/discover/tv?with_ott_providers=8&vote_average.lte=10&sort_by=popularity.desc`,
    NEXTFLEX_ORIGINALS: `${BASE_URL}/discover/tv?with_networks=213&page=2`,
    TRENDING: `${BASE_URL}/trending/movie/week?language=en-US`,
    TOP_RATED: `${BASE_URL}/movie/top_rated?language=en-US`,
    ACTION_MOVIES: `${BASE_URL}/discover/movie?with_genres=28`,
    COMEDY_MOVIES: `${BASE_URL}/discover/movie?with_genres=35`,
    HORROR_MOVIES: `${BASE_URL}/discover/movie?with_genres=27`,
    ROMANCE_MOVIES: `${BASE_URL}/discover/movie?with_genres=10749`,
    DOCUMENTARIES: `${BASE_URL}/discover/movie?with_genres=99`,
    MOVIE_GENRES: `${BASE_URL}/genre/movie/list`,
    TV_GENRES: `${BASE_URL}/genre/tv/list`,
    MEDIA_VIDEOS: (mediaType, mediaId) => {
      return `${BASE_URL}/${mediaType}/${mediaId}/videos?append_to_response=videos`;
    },
    MEDIA_CREDITS: (mediaType, mediaId) => {
      return `${BASE_URL}/${mediaType}/${mediaId}/credits`;
    },
  },
};

export default APIConstant;
