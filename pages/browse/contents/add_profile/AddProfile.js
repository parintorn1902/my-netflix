import { useEffect, useState } from "react";
import Image from "next/image";
import NewProfileImage from "@assets/images/newprofile.png";
import TextInput from "@components/TextInput/TextInput";
import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import Tooltip from "@components/Tooltip/Tooltip";
import tw from "@utils/Tailwind";
import UserProfileApi from "@app/master/user_profiles/UserProfileApi";
import ImageHelper from "@utils/ImageHelper";

function AddProfile({ onCancel }) {

  const [profileName, setProfileName] = useState("");
  const [showError, setShowError] = useState(false);
  const [activeValidate, setActionValidate] = useState(false);
  const [isKid, setIsKid] = useState(false);

  useEffect(() => {
    if (activeValidate) {
      validateProfileName();
    }
  }, [profileName])

  const toggleSetKid = () => {
    setIsKid(!isKid);
  }

  const handleProfileNameChange = ({ target }) => {
    setProfileName(target.value);
  }

  const handleSubmitAddProfile = () => {
    setActionValidate(true);
    let hasError = validateProfileName();
    if (!hasError) {
      // no error
      UserProfileApi.addUserProfile(profileName);
      onCancel();
    }
  }

  const validateProfileName = () => {
    if (profileName?.length === 0) {
      setShowError(true);
      return true;
    }

    setShowError(false);
    return false;
  }

  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "h-full w-full",
        "overflow-hidden"
      )}
    >
      <div
        className={tw(
          "flex flex-col",
          "animate-landing-loaded"
        )}
      >
        <div
          className={tw(
            "text-[4vw] lg:text-[30px]",
            "text-white"
          )}
        >
          Add Profile
        </div>
        <div className="mb-[1em]">Add a profile for another person watching Netflix</div>
        <div
          className={tw(
            "py-[2em]",
            "border-t-[0.5px] border-t-[#555] border-b-[0.5px] border-b-[#555]"
          )}
        >
          <div className="flex flex-row">
            <div
              className={tw(
                "w-[8vw] h-[8vw] lg:w-[60px] lg:h-[60px]",
                "rounded-md overflow-hidden"
              )}
            >
              <Image
                className="object-contain"
                layout="responsive"
                objectFit="fill"
                src={NewProfileImage}
                alt="Profile Image"
                placeholder="blur"
                blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
              />
            </div>
            <div className="flex items-center justify-center">
              <div
                className={tw(
                  "flex flex-col",
                  "ml-[2em]"
                )}
              >
                <div className="flex flex-row items-center justify-center">
                  <TextInput
                    placeholder="Name"
                    value={profileName}
                    onChange={handleProfileNameChange}
                    error={showError}
                  />
                  <div className="mx-[1em]">
                    <Checkbox checked={isKid} onChange={toggleSetKid} />
                  </div>
                  <Tooltip
                    text="Kid?"
                    tooltipMessage="If selected, this profile will only see TV shows and movies rated for ages 12 and under."
                  />
                </div>

                {
                  showError && (
                    <span
                      className={tw(
                        " text-[1vw] lg:text-[12px] mt-[.5em]",
                        "text-[#b9090b]"
                      )}
                    >
                      Please enter name
                    </span>
                  )
                }
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-row mt-[2em]">
          <Button
            variant="contained"
            active={profileName?.length > 0}
            buttonText="CONTINUE"
            onClick={handleSubmitAddProfile}
          />
          <div className="w-[20px]" />
          <Button
            buttonText="CANCEL"
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  )
}

export default AddProfile
