import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import PageConstant from "@constants/PageConstant";
import UserProfileData from "@stores/UserProfileStore/UserProfileData";
import ThreadHelper from "@utils/ThreadHelper";
import Button from "@components/Button/Button"
import AddProfileContent from "./AddProfileContent";
import EditProfileContent from "./EditProfileContent";
import EnterPinContent from "./EnterPinContent";
import LandingProfileItem from "./LandingProfileItem";
import tw from "@utils/Tailwind";

const CONTENT = {
  NORMAL: "normal",
  MANAGE_PROFILES: "manageProfiles",
  ADD_PROFILE: "addProfile",
  EDIT_PROFILE: "editProfile",
  ENTER_PIN: "enterPin"
};

function LandingContent() {

  const router = useRouter();

  const [currentProfile, setCurrentProfile] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const [previousContent, setPreviousContent] = useState(null);
  const [currentContent, setCurrentContent] = useState(CONTENT.NORMAL);

  const handleManageProfileClick = async () => {
    setShowContent(false);
    await ThreadHelper.sleep(100);
    if (currentContent === CONTENT.MANAGE_PROFILES) {
      setCurrentContent(CONTENT.NORMAL);
    } else {
      setCurrentContent(CONTENT.MANAGE_PROFILES);
    }
    setShowContent(true);
  }

  const handleProfileItemClick = (clickedItem) => {
    setCurrentProfile(clickedItem);
    // check content
    if (currentContent === CONTENT.NORMAL) {
      if (clickedItem.isLocked) {
        setCurrentContent(CONTENT.ENTER_PIN);
      } else {
        // push to main page
        router.push(PageConstant.BROWSE);
      }
    } else if (currentContent === CONTENT.MANAGE_PROFILES) {
      setCurrentContent(CONTENT.EDIT_PROFILE);
    }
  }

  const handleAddProfileClick = () => {
    setPreviousContent(currentContent);
    setCurrentContent(CONTENT.ADD_PROFILE);
  }

  const handleCancelContentClick = () => {
    // reset current profile
    setCurrentProfile(null);
    if (currentContent === CONTENT.ADD_PROFILE) {
      setCurrentContent(previousContent);
    } else if (currentContent === CONTENT.EDIT_PROFILE) {
      setCurrentContent(CONTENT.MANAGE_PROFILES);
    } else if (currentContent === CONTENT.ENTER_PIN) {
      setCurrentContent(CONTENT.NORMAL);
    }
  }

  const renderContent = () => {
    if (currentContent === CONTENT.ADD_PROFILE) {
      return <AddProfileContent onCancel={handleCancelContentClick} />
    } else if (currentContent === CONTENT.EDIT_PROFILE) {
      return <EditProfileContent editProfile={currentProfile} onCancel={handleCancelContentClick} />
    } else if (currentContent === CONTENT.ENTER_PIN) {
      return (
        <EnterPinContent
          visible={currentContent === CONTENT.ENTER_PIN}
          profilePassword={currentProfile?.profilePassword}
          onCancel={handleCancelContentClick}
        />
      );
    } else {
      return showContent && (
        <div className={tw(
          "flex flex-col items-center justify-center",
          "animate-landing-loaded"
        )}>
          <div className="bg-[#131313] mb-10">
            <div
              className={tw(
                "text-[3.5vw] lg:text-[35px]",
                "text-white text-center"
              )}
            >
              {currentContent === CONTENT.MANAGE_PROFILES ? "Manage Profiles:" : "Who's watching?"}
            </div>
            <ul
              className={tw(
                "flex flex-row items-center justify-center",
                "space-x-[2vw] mt-[2em] flex-wrap"
              )}
            >
              {
                UserProfileData.map(item => (
                  <LandingProfileItem
                    key={item.profileName}
                    profileName={item.profileName}
                    profileImage={item.profileImage}
                    isLocked={item.isLocked}
                    onClick={() => handleProfileItemClick(item)}
                    showEditLayout={currentContent === CONTENT.MANAGE_PROFILES}
                  />
                ))
              }
              <LandingProfileItem
                profileName="Add Profile"
                isLocked={false}
                isAddProfile={true}
                onClick={handleAddProfileClick}
              />
            </ul>
          </div>
          <div>
            {
              currentContent === CONTENT.NORMAL ? (
                <Button
                  buttonText="MANAGE PROFILES"
                  onClick={handleManageProfileClick}
                />
              ) : (
                <Button
                  variant="contained"
                  buttonText="DONE"
                  onClick={handleManageProfileClick}
                />
              )
            }
          </div>
        </div>
      )
    }
  }

  return (
    <section
      className={tw(
        "flex flex-col items-center justify-center",
        "h-full w-full",
        "overflow-hidden"
      )}
    >
      <div
        className={tw(
          "absolute flex",
          "top-0 left-0 h-[3.5vw] w-full lg:h-[50px]",
          "bg-gradient-to-b from-[#000000] via-[#0e0e0e] to-[transparent]"
        )}
      />
      {renderContent()}
    </section>
  )
}

export default LandingContent
