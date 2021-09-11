import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../../components/Contents/edit_profile/EditProfile";
import NavBar from "@components/NavBar/NavBar";
import SelectProfiles from "../../components/Contents/select_profiles/SelectProfiles";
import ManageProfiles from "../../components/Contents/manage_profiles/ManageProfiles";
import AuthenProfile from "../../components/Contents/authen_profile/AuthenProfile";
import AddProfile from "../../components/Contents/add_profile/AddProfile";
import MovieList from "../../components/Contents/movie_list/MovieList";
import UserProfileApi from "@app/master/user_profiles/UserProfileApi";
import GlobalManager from "@app/store/manage/GlobalManager";

const CONTENT = {
  MOVIE_LIST: "movieList",
  SELECT_PROFILES: "selectProfiles",
  MANAGE_PROFILES: "manageProfiles",
  ADD_PROFILE: "addProfile",
  EDIT_PROFILE: "editProfile",
  AUTHEN_PROFILE: "authenProfile",
};

function Browse() {
  const profileData = useSelector((state) => state.global.profileData);
  const launchProfileData = useSelector((state) => state.global.launchProfileData);
  const preLaunchProfileData = useSelector((state) => state.global.preLaunchProfileData);

  const [currentContent, setCurrentContent] = useState(CONTENT.SELECT_PROFILES);
  const [previousContent, setPreviousContent] = useState(null);
  const [backupProfielData, setBackupProfileData] = useState(null);

  useEffect(() => {
    if (preLaunchProfileData) {
      if (preLaunchProfileData?.isLocked) {
        if (launchProfileData) {
          // set backup & clear launch profile if change profile
          setBackupProfileData(launchProfileData);
          GlobalManager.setLaunchProfile(null);
        }
        setCurrentContent(CONTENT.AUTHEN_PROFILE);
      } else {
        handleLaunchProfile();
      }
    }
  }, [preLaunchProfileData]);

  useEffect(() => {
    const cookieProfileId = Cookie.get("mnf_id");
    if (cookieProfileId) {
      let initialProfileData = UserProfileApi.getUserProfileById(cookieProfileId);
      if (initialProfileData) {
        GlobalManager.setLaunchProfile(initialProfileData);
        setCurrentContent(CONTENT.MOVIE_LIST);
      }
    }
  }, []);

  const handleCancelContentClick = () => {
    // reset data
    GlobalManager.setProfile(null);
    GlobalManager.setPreLaunchProfile(null);
    if (currentContent === CONTENT.ADD_PROFILE) {
      setCurrentContent(previousContent);
    } else if (currentContent === CONTENT.EDIT_PROFILE) {
      setCurrentContent(CONTENT.MANAGE_PROFILES);
    } else if (currentContent === CONTENT.AUTHEN_PROFILE) {
      let hasBackup = false;
      if (backupProfielData) {
        hasBackup = true;
        GlobalManager.setLaunchProfile(backupProfielData);
        setBackupProfileData(null);
      }
      let displayContent =
        launchProfileData || hasBackup ? CONTENT.MOVIE_LIST : CONTENT.SELECT_PROFILES;
      setCurrentContent(displayContent);
    }
  };

  const handleSelectProfile = (selectedProfile) => {
    if (currentContent === CONTENT.MANAGE_PROFILES) {
      // edit profile
      GlobalManager.setProfile(selectedProfile);
      setCurrentContent(CONTENT.EDIT_PROFILE);
    } else {
      // launch profile
      GlobalManager.setPreLaunchProfile(selectedProfile);
    }
  };

  const handleDoneManageProfile = () => {
    // setPreviousContent(currentContent);
    setCurrentContent(CONTENT.SELECT_PROFILES);
  };

  const handleStartManageProfile = () => {
    // setPreviousContent(currentContent);
    setCurrentContent(CONTENT.MANAGE_PROFILES);
  };

  const handleAddProfile = () => {
    setPreviousContent(currentContent);
    setCurrentContent(CONTENT.ADD_PROFILE);
  };

  const handleLaunchProfile = () => {
    Cookie.set("mnf_id", preLaunchProfileData.profileId, { expires: 1 / 96 });
    GlobalManager.setLaunchProfile(preLaunchProfileData);
    GlobalManager.setPreLaunchProfile(null);
    setCurrentContent(CONTENT.MOVIE_LIST);
    setBackupProfileData(null);
  };

  const handleManageProfileOnNavBar = () => {
    Cookie.remove("mnf_id");
    GlobalManager.clearAll();
    setCurrentContent(CONTENT.MANAGE_PROFILES);
  };

  const handleExitProfile = () => {
    Cookie.remove("mnf_id");
    GlobalManager.clearAll();
    setCurrentContent(CONTENT.SELECT_PROFILES);
  };

  const renderContent = () => {
    if (currentContent === CONTENT.MOVIE_LIST) {
      return <MovieList profileData={launchProfileData} />;
    } else if (currentContent === CONTENT.SELECT_PROFILES) {
      return (
        <SelectProfiles
          onSelectProfile={handleSelectProfile}
          onManageProfile={handleStartManageProfile}
          onAddProfile={handleAddProfile}
        />
      );
    } else if (currentContent === CONTENT.MANAGE_PROFILES) {
      return (
        <ManageProfiles
          onSelectProfile={handleSelectProfile}
          onManageProfile={handleDoneManageProfile}
          onAddProfile={handleAddProfile}
        />
      );
    } else if (currentContent === CONTENT.AUTHEN_PROFILE) {
      return (
        <AuthenProfile
          profileData={preLaunchProfileData}
          onLaunchProfile={handleLaunchProfile}
          onCancel={handleCancelContentClick}
        />
      );
    } else if (currentContent === CONTENT.EDIT_PROFILE) {
      return <EditProfile editProfile={profileData} onCancel={handleCancelContentClick} />;
    } else if (currentContent === CONTENT.ADD_PROFILE) {
      return <AddProfile onCancel={handleCancelContentClick} />;
    } else {
      return null;
    }
  };

  return (
    <div className="h-full">
      <NavBar
        profileData={launchProfileData}
        onManageProfile={handleManageProfileOnNavBar}
        onExitProfile={handleExitProfile}
      />
      {renderContent()}
    </div>
  );
}

export default Browse;
