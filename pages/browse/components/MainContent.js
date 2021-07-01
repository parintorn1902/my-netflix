import UserProfileApi from "@app/master/user_profiles/UserProfileApi";
import NavBar from "@components/NavBar/NavBar";
import APIConstant from "@constants/APIConstant";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieRow from "./MovieRow";

function MainContent({ profileId }) {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profileId) {
      let getProfileData = UserProfileApi.getUserProfileById(parseInt(profileId));
      setProfileData(getProfileData);
    }
  }, [profileId])

  return (
    <div className="flex flex-col animate-fade-in">
      <NavBar profileData={profileData} />
      <Banner />
      <div
        className="overflow-x-hidden"
      >
        <MovieRow title="Popular on Netflix" fetchUrl={APIConstant.URL.POPULAR_ON_NEXFLIX} />
        {/* <MovieRow title="Netflix Originals" fetchUrl={APIConstant.URL.NEXTFLEX_ORIGINALS} /> */}
        <MovieRow title="Trending Now" fetchUrl={APIConstant.URL.TRENDING} />
        <MovieRow title="Top Rated" fetchUrl={APIConstant.URL.TOP_RATED} />
        <MovieRow title="Action Movies" fetchUrl={APIConstant.URL.ACTION_MOVIES} />
        <MovieRow title="Comedy Movies" fetchUrl={APIConstant.URL.COMEDY_MOVIES} />
        <MovieRow title="Horror Movies" fetchUrl={APIConstant.URL.HORROR_MOVIES} />
        <MovieRow title="Romance Movies" fetchUrl={APIConstant.URL.ROMANCE_MOVIES} />
        <MovieRow title="Documentaries" fetchUrl={APIConstant.URL.DOCUMENTARIES} />
      </div>
    </div>
  )
}

export default MainContent
