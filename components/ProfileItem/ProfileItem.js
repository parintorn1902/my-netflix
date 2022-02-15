import { LockClosedIcon } from "@heroicons/react/outline";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/solid";
import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import Image from "next/image";

function ProfileItem({
  profileImage,
  profileName,
  isLocked,
  isAddProfile,
  showEditLayout,
  onClick,
}) {
  console.log("🚀 ~ profileImage", profileImage);

  const getProfileImageContent = () => {
    if (isAddProfile === true) {
      return (
        <div
          className={tw(
            "flex items-center justify-center", // layout
            "h-[10vw] w-[10vw] lg:min-w-[100px] lg:min-h-[100px]", // measure
            "bg-transparent rounded-md group-hover:bg-gray-100" // style
          )}
        >
          <PlusCircleIcon
            className={tw(
              "text-[gray]", // style
              "w-[8vw] lg:min-w-[75px]" // measure
            )}
          />
        </div>
      );
    } else {
      return (
        <div
          className={tw(
            "relative", // layout
            "h-[10vw] w-[10vw] lg:min-w-[100px] lg:min-h-[100px]", // measure
            "rounded-md overflow-hidden" // style
          )}
        >
          <div
            className={tw(
              "absolute", // layout
              "h-[10vw] w-[10vw] lg:min-w-[100px] lg:min-h-[100px]", // measure
              "border-4 border-transparent group-hover:border-gray-100 z-10" // style
            )}
          />
          {profileImage && (
            <img
              className={tw("object-contain w-full")}
              src={profileImage}
              alt="Profile Image"
              // layout="responsive"
              // objectFit="fill"
              // quality={65}
              // placeholder="blur"
              // blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
            />
          )}
          {showEditLayout && (
            <div
              className={tw(
                "absolute flex items-center justify-center", // layout
                "h-[10vw] w-[10vw] lg:min-w-[100px] lg:min-h-[100px]", // measure
                "top-0 bg-[#00000080] z-20" // style
              )}
            >
              <div
                className={tw(
                  "p-1.5", // measure
                  "rounded-full border-white border-2" // style
                )}
              >
                <PencilIcon
                  className={tw(
                    "w-[1.5vw] lg:w-[20px]", // measure
                    "text-white" // style
                  )}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <li
      className={tw(
        "flex flex-col items-center", // layout
        "w-[10vw] min-w-[100px] mb-[2em] lg:mb-[20px]" // measure
      )}
      onClick={onClick}
    >
      <div
        className={tw(
          "group flex flex-col items-center justify-center", // layout
          "cursor-pointer" // style
        )}
      >
        {getProfileImageContent()}
        <p
          className={tw(
            "px-2 py-3 w-full", // measure
            "text-center group-hover:text-gray-100  truncate" // style
          )}
        >
          {profileName}
        </p>
      </div>
      <div
        className={tw(
          "flex justify-center", // layout
          "w-[1.25vw] h-[1.25vw] lg:w-[14px] lg:h-[14px]" // measure
        )}
      >
        {isLocked && <LockClosedIcon />}
      </div>
    </li>
  );
}

export default ProfileItem;
