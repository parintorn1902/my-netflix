import { useEffect, useState } from "react";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/outline";
import TextInput from "@components/TextInput/TextInput";
import Button from "@components/Button/Button";
import Divider from "@components/Divider/Divider";
import Checkbox from "@components/Checkbox/Checkbox";
import UserProfileApi from "@app/master/user_profiles/UserProfileApi";
import tw from "@utils/Tailwind";
import ImageHelper from "@utils/ImageHelper";

function EditProfile({ editProfile = {}, onCancel }) {
  const [profileName, setProfileName] = useState("");
  const [showError, setShowError] = useState(false);
  const [activeValidate, setActionValidate] = useState(false);
  const [autoPlayNextEp, setAutoPlayNextEp] = useState(false);
  const [autoPlayPreviews, setAutoPlayPreviews] = useState(false);

  const { profileImage, isLocked } = editProfile;

  useEffect(() => {
    if (editProfile) {
      setProfileName(editProfile?.profileName);
      setAutoPlayNextEp(editProfile?.autoPlayNextEp);
      setAutoPlayPreviews(editProfile?.autoPlayPreviews);
    }
  }, [editProfile]);

  useEffect(() => {
    if (activeValidate) {
      validateProfileName();
    }
  }, [profileName]);

  const validateProfileName = () => {
    if (profileName?.length === 0) {
      setShowError(true);
      return true;
    }

    setShowError(false);
    return false;
  };

  const handleProfileNameChange = ({ target }) => {
    setProfileName(target.value);
  };

  const handleAutoPlayNextEpChange = () => {
    setAutoPlayNextEp(!autoPlayNextEp);
  };

  const handleAutoPreviewsChange = () => {
    setAutoPlayPreviews(!autoPlayPreviews);
  };

  const handleSaveEdit = () => {
    setActionValidate(true);
    let hasError = validateProfileName();
    if (hasError) {
      // error
      return;
    }
    // pass
    let userProfileData = {
      ...editProfile,
      profileName,
      autoPlayNextEp,
      autoPlayPreviews,
    };

    UserProfileApi.updateUserProfile(userProfileData);

    onCancel();
  };

  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "h-full w-full",
        "overflow-hidden"
      )}
    >
      <div className={tw("flex flex-col", "px-[20px]", "text-[#ddd] animate-landing-loaded")}>
        <h1 className="text-[4vw] lg:text-[30px]">Edit Profile</h1>
        <div
          className={tw(
            "border-t-[0.5px] border-t-[#555] border-b-[0.5px] border-b-[#555]",
            "py-[1.5em]"
          )}
        >
          <div className="flex flex-row">
            <div className="flex-col h-full mr-[20px]">
              <div className="w-[8vw] h-[8vw] lg:w-[70px] lg:h-[70px] rounded-md overflow-hidden">
                {profileImage && (
                  <img
                    className="object-contain w-full"
                    src={profileImage}
                    alt="Profile Image"
                    // layout="responsive"
                    // objectFit="fill"
                    // placeholder="blur"
                    // blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <TextInput
                autoFocus={true}
                placeholder="Name"
                onChange={handleProfileNameChange}
                value={profileName}
                error={showError}
              />
              {showError && (
                <span className={tw(" text-[1vw] lg:text-[12px] mt-[.5em]", "text-[#b9090b]")}>
                  Please enter name
                </span>
              )}
              <span className="mt-[1em]">Language: English</span>
              <Divider />
              <div className="flex flex-row">
                <LockClosedIcon className="mr-[.75em] w-[1.5em] lg:w-[20px]" />
                <span>
                  Profile Lock is <strong>{isLocked ? "ON" : "OFF"}</strong>
                </span>
              </div>
              <Divider />
              <span>Maturity Settings:</span>
              <span className="py-[.3em] px-[.6em] text-white bg-[#333] w-[fit-content] my-[1em]">
                ALL MATURITY RATINGS
              </span>
              <span className="text-white">
                Show titles of <b>all maturity ratings</b> for this profile.
              </span>
              <Divider />
              <span>Autoplay controls</span>
              <div className="flex flex-row mt-[.4em]" onClick={handleAutoPlayNextEpChange}>
                <div className="mr-[1em]">
                  <Checkbox checked={autoPlayNextEp} />
                </div>
                <span>Autoplay next episode in a series on all devices.</span>
              </div>
              <div className="flex flex-row mt-[.4em]" onClick={handleAutoPreviewsChange}>
                <div className="mr-[1em]">
                  <Checkbox checked={autoPlayPreviews} />
                </div>
                <span>Autoplay previews while browsing on all devices.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-[2em] space-x-[20px] lg:justify-center">
          <Button variant="contained" buttonText="SAVE" onClick={handleSaveEdit} />
          <Button buttonText="CANCEL" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
