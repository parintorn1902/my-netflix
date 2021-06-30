import Cookie from "js-cookie";
import Landing from "pages/landing";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "./components/MainContent";

function Browse() {

  const profileData = useSelector(state => state.profile.profileData);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const cookieProfileId = Cookie.get("mnf_id");
    if(cookieProfileId) {
      setProfileId(cookieProfileId);
    }
  },[]);

  useEffect(() => {
    if(profileData) {
      setProfileId(profileData.profileId);
    }
  }, [profileData]);

  const renderContent = () => {
    if(profileId) {
      return <MainContent profileId={profileId} />
    } else {
      return <Landing />
    }
  }

  return renderContent();
}

export default Browse
