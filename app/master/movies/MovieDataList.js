import APIConstant from "@constants/APIConstant";

const MovieDataList = [
  {
    title: "Popular on Netflix",
    mediaType: "tv",
    fetchUrl: APIConstant.URL.POPULAR_ON_NEXFLIX,
  },
  {
    title: "Trending Now",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.TRENDING,
  },
  {
    title: "Top Rated",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.TOP_RATED,
  },
  {
    title: "Action Movies",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.ACTION_MOVIES,
  },
  {
    title: "Comedy Movies",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.COMEDY_MOVIES,
  },
  {
    title: "Horror Movies",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.HORROR_MOVIES,
  },
  {
    title: "Romance Movies",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.ROMANCE_MOVIES,
  },
  {
    title: "Documentaries",
    mediaType: "movie",
    fetchUrl: APIConstant.URL.DOCUMENTARIES,
  },
];

export default MovieDataList;
