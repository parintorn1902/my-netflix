import APIConstant from "@constants/APIConstant";


const MovieDataList = [
  {
    title: "Popular on Netflix",
    fetchUrl: APIConstant.URL.POPULAR_ON_NEXFLIX
  },
  {
    title: "Trending Now",
    fetchUrl: APIConstant.URL.TRENDING
  },
  {
    title: "Top Rated",
    fetchUrl: APIConstant.URL.TOP_RATED
  },
  {
    title: "Action Movies",
    fetchUrl: APIConstant.URL.ACTION_MOVIES
  },
  {
    title: "Comedy Movies",
    fetchUrl: APIConstant.URL.COMEDY_MOVIES
  },
  {
    title: "Horror Movies",
    fetchUrl: APIConstant.URL.HORROR_MOVIES
  },
  {
    title: "Romance Movies",
    fetchUrl: APIConstant.URL.ROMANCE_MOVIES
  },
  {
    title: "Documentaries",
    fetchUrl: APIConstant.URL.DOCUMENTARIES
  },
];

export default MovieDataList;