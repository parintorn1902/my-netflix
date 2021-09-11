import MovieDataList from "@app/master/movies/MovieDataList";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieRow from "./MovieRow";

function MovieList({ profileData }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileData?.isLocked) {
      // do nothing
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [profileData]);

  const renderContent = () => {
    if (loading) {
      return null;
    } else {
      return (
        <>
          <Banner />
          <div
            className="my-[3vw] overflow-x-hidden"
          >
            {
              MovieDataList.map((item, index) => (
                <MovieRow
                  title={item.title}
                  fetchUrl={item.fetchUrl}
                  position={(index + 1)}
                  key={"_movieRow_" + index}
                />
              ))
            }
          </div>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {renderContent()}
    </div>
  )
}

export default MovieList
