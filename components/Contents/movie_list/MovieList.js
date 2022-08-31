import MovieDataList from "@app/master/movies/MovieDataList";
import React, { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import MovieRow from "./MovieRow";

import Service from "@app/core/Service";
import APIConstant from "@constants/APIConstant";
import MoviePreview from "./MoviePreview";
import MoviePreviewForTouchDevice from "./MoviePreviewForTouchDevice";

function MovieList({ profileData }) {
  const [loading, setLoading] = useState(false);
  const [popItem, setPopItem] = useState(null);
  const [popVideo, setPopVideo] = useState(null);
  const [popCredits, setPopCredits] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    if (profileData?.isLocked) {
      // do nothing
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }

    if (profileData) {
      fetchMovieGenres();
      fetchTvGenres();
    }
  }, [profileData]);

  useEffect(() => {
    if (popItem) {
      // console.log("Pop", popItem);
      setPopVideo(null);
      setPopCredits(null);
      fetchPopVideos();
      fetchPopCredits();
    }
  }, [popItem]);

  const fetchPopCredits = async () => {
    try {
      const response = await Service.get(
        APIConstant.URL.MEDIA_CREDITS(popItem.mediaType, popItem.targetData.id)
      );
      if (!response.success) {
        return;
      }
      setPopCredits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopVideos = async () => {
    try {
      const response = await Service.get(
        APIConstant.URL.MEDIA_VIDEOS(popItem.mediaType, popItem.targetData.id)
      );
      if (!response.success) {
        return;
      }
      const foundVideos = response.data.results;
      if (foundVideos.length > 0) {
        const filterYoutubeVideos = foundVideos.filter(
          (item) => item.site.toLowerCase() === "youtube"
        );
        setPopVideo(filterYoutubeVideos[0]);
      } else {
        setPopVideo({ key: "Amq-qlqbjYA" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieGenres = async () => {
    try {
      const fetchResponse = await Service.get(APIConstant.URL.MOVIE_GENRES);
      if (fetchResponse.success) {
        const genres = fetchResponse.data.genres || [];
        const convertGenres = genres.map((item) => ({
          ...item,
          name: item.name.split("&")[0],
        }));
        setMovieGenres(convertGenres);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTvGenres = async () => {
    try {
      const fetchResponse = await Service.get(APIConstant.URL.TV_GENRES);
      if (fetchResponse.success) {
        const genres = fetchResponse.data.genres || [];
        const convertGenres = genres.map((item) => ({
          ...item,
          name: item.name.split("&")[0],
        }));
        setTvGenres(convertGenres);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (data) => {
    const { y } = data.targetRef.getBoundingClientRect();
    let popHeight = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    if (y + 68 - popHeight / 2 < 0) {
      return;
    }
    setPopItem(data);
  };

  const handleMouseLeave = () => {
    // console.log("Leave");
    setPopItem(null);
    setPopVideo(null);
    setPopCredits(null);
  };

  const renderMoviePreview = () => {
    if (popItem) {
      const mediaGenres = popItem.mediaType == "tv" ? tvGenres : movieGenres;
      if (popItem.isTouch) {
        return (
          <MoviePreviewForTouchDevice
            popItem={popItem}
            popVideo={popVideo}
            popCredits={popCredits}
            mediaGenres={mediaGenres}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else {
        return (
          <MoviePreview
            popItem={popItem}
            popVideo={popVideo}
            mediaGenres={mediaGenres}
            onMouseLeave={handleMouseLeave}
          />
        );
      }
    } else {
      return null;
    }
  };

  const renderContent = () => {
    if (loading) {
      return null;
    } else {
      return (
        <React.Fragment>
          <Banner />
          <div className="my-[3vw] overflow-x-hidden">
            {MovieDataList.map((item, index) => (
              <MovieRow
                key={"_movieRow_" + index}
                title={item.title}
                fetchUrl={item.fetchUrl}
                mediaType={item.mediaType}
                onMouseEnter={handleMouseEnter}
                rowIndex={index}
              />
            ))}
          </div>
          {renderMoviePreview()}
        </React.Fragment>
      );
    }
  };

  return <div className="animate-fade-in">{renderContent()}</div>;
}

export default MovieList;
