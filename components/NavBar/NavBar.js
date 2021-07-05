import Image from "next/image";
import NetflixLogo from "@assets/images/logo.png";
import tw from "@utils/Tailwind";
import { LockClosedIcon, SearchIcon } from "@heroicons/react/outline";
import { BellIcon, ChevronDownIcon, XIcon } from "@heroicons/react/solid";
import { createRef, useEffect, useState } from "react";
import ThreadHelper from "@utils/ThreadHelper";
import UserProfileData from "@app/master/user_profiles/UserProfileData";
import { useDispatch, useSelector } from "react-redux";
import { setPreLaunchProfile, setSearchFilter } from "@app/store/slice/globalSlice";
import ImageHelper from "@utils/ImageHelper";

function NavBar({ profileData, onManageProfile, onExitProfile }) {

  const dispatch = useDispatch();
  const searchFilter = useSelector(state => state.global.searchFilter);

  const [showSearchParent, setShowSearchParent] = useState(false);
  const [showSearchTextInput, setShowSearchTextInput] = useState(false);
  const [showSeachIcon, setShowSearchIcon] = useState(true);

  const navRef = createRef();
  const searchTextInputRef = createRef();

  useEffect(() => {
    const handleNavBg = (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      const className = "bg-[#141414]";
      if (scrolled > 40) {
        if (navRef.current) {
          navRef.current.classList.add(className);
        }
      } else {
        if (navRef.current) {
          navRef.current.classList.remove(className);
        }
      }
    };
    handleNavBg();
    const listener = document.addEventListener("scroll", handleNavBg);
    return () => document.removeEventListener("scroll", listener);
  });

  const handleSearchIconClick = async () => {
    setShowSearchParent(true)
    setShowSearchIcon(false);
    await ThreadHelper.sleep(300);
    setShowSearchTextInput(true);
  }

  const handleSearchTextInputBlurred = async () => {

    if (searchFilter?.length > 0) {
      return;
    }

    clearSearchText();
    setShowSearchParent(false);
    setShowSearchTextInput(false);
    await ThreadHelper.sleep(300);
    setShowSearchIcon(true);
  }

  const handleSearchTextInputChange = ({ target }) => {
    dispatch(setSearchFilter(target.value));
  }

  const handleClearSearchTextIconClick = () => {
    clearSearchText();
    if (searchTextInputRef.current) {
      searchTextInputRef.current.focus();
    }
  }

  const clearSearchText = () => {
    dispatch(setSearchFilter(""));
  }

  const handleChangeProfile = (launchProfileData) => {
    dispatch(setPreLaunchProfile(launchProfileData));
  }

  const renderNavMenu = () => {
    const inactiveListItemClasses = "cursor-pointer hover:text-[#b3b3b3] transition-all duration-300";
    const rightMenuIconClass = "text-white";
    if (profileData) {
      return (
        <>
          <ul
            className={tw(
              "inline-flex lg:hidden",
              "space-x-[1vw] pl-[2.2vw]",
              "text-[.75vw] 2xl:text-[14px] text-white font-normal",
            )}
          >
            <li className="font-bold">Home</li>
            <li className={inactiveListItemClasses}>TV Shows</li>
            <li className={inactiveListItemClasses}>Movies</li>
            <li className={inactiveListItemClasses}>New & Popular</li>
            <li className={inactiveListItemClasses}>My List</li>
          </ul>
          <div
            className={tw(
              "flex items-center justify-center absolute",
              "h-full right-[60px] 2xl:right-[4%] top-0 space-x-[20px]",
            )}
          >
            <div
              className={tw(
                "flex flex-row",
                "cursor-pointer",
                "md:hidden"
              )}
            >
              <div
                className={tw(
                  "flex flex-row items-center",
                  "border-white border-[1px]",
                  "h-[34px] px-[4px]",
                  "transform transition-all duration-300",
                  showSearchParent ? "w-[250px] visible" : "w-0 invisible"
                )}
              >
                <SearchIcon
                  className={tw(
                    rightMenuIconClass
                  )}
                  width={25}
                />
                {
                  showSearchTextInput && (
                    <input
                      ref={searchTextInputRef}
                      className={tw(
                        "outline-none bg-transparent",
                        "text-white text-[16px]",
                        "h-[30px] px-[10px]"
                      )}
                      type="text"
                      autoFocus
                      placeholder="Titles, people, genres"
                      onBlur={handleSearchTextInputBlurred}
                      onChange={handleSearchTextInputChange}
                      value={searchFilter}
                    />
                  )
                }
                {
                  searchFilter?.length > 0 && (
                    <XIcon
                      className={tw(
                        rightMenuIconClass
                      )}
                      width={18}
                      onClick={handleClearSearchTextIconClick}
                    />
                  )
                }
              </div>
              {
                showSeachIcon && (
                  <SearchIcon
                    className={tw(
                      rightMenuIconClass
                    )}
                    width={25}
                    onClick={handleSearchIconClick}
                  />
                )
              }
            </div>
            <BellIcon
              className={tw(
                rightMenuIconClass,
                "cursor-pointer"
              )}
              width={25}
            />

            <div className="relative group">
              <div className="profile-tooltip">
                <div
                  className={tw(
                    "group flex flex-row",
                    "space-x-1",
                    "cursor-pointer",
                    "profile-tooltip-text"
                  )}
                >
                  {
                    profileData?.profileImage && (
                      <Image
                        className="rounded-[5px]"
                        src={require("@assets/images/" + profileData.profileImage)}
                        alt={profileData.profileImage}
                        width={32}
                        height={32}
                      />
                    )
                  }
                  <ChevronDownIcon
                    className={tw(
                      rightMenuIconClass,
                      "transfrom group-hover:rotate-180 transition duration-300"
                    )}
                    width={20}
                  />
                </div>
                <div className="profile-tooltip-content text-[13px]">
                  <div className="flex flex-col text-left p-[0.8em]">
                    <div className="mt-[10px] mb-[5px]">
                      {
                        UserProfileData
                          .filter(item => item.profileId !== profileData.profileId)
                          .map(item => (
                            <NavProfileItem
                              key={item.profileId}
                              profileData={item}
                              onClick={() => handleChangeProfile(item)}
                            />
                          ))
                      }
                    </div>
                    <div
                      className={tw(
                        "cursor-pointer hover:underline mb-[24px]"
                      )}
                      onClick={onManageProfile}
                    >
                      Manage Profiles
                    </div>
                    <div
                      className={tw(
                        "cursor-pointer hover:underline mb-[5px]"
                      )}
                      onClick={onExitProfile}
                    >
                      Exit Profile
                    </div>
                  </div>
                  <div
                    className={
                      tw(
                        "w-full h-[0.5px]",
                        "bg-[#555]"
                      )
                    }
                  />
                  <div
                    className={tw(
                      "flex flex-col",
                      "p-[0.8em] my-[5px] space-y-[7px]",
                      "text-left font-bold",
                      "cursor-pointer"
                    )}
                  >
                    <div
                      className={tw(
                        "hover:underline"
                      )}
                    >
                      Account
                    </div>
                    <div
                      className={tw(
                        "hover:underline"
                      )}
                    >
                      Help Center
                    </div>
                    <div
                      className={tw(
                        "hover:underline"
                      )}
                    >
                      Sign out of Netflix
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <nav
      ref={navRef}
      className={tw(
        "fixed flex flex-row items-center top-0 left-0 z-50",
        "w-full h-[68px] md:h-[52px]",
        "bg-gradient-to-b from-[#000000aa] via-[#00000050] to-transparent",
        "transition duration-300"
      )}
    >
      <div
        className={tw(
          "cursor-pointer",
          "ml-[3.2vw] w-[90px] md:w-[65px]"
        )}
      >
        <Image
          className="object-contain"
          src={NetflixLogo}
          alt="Logo"
          layout="responsive"
          objectFit="fill"
          loading="eager"
          quality={30}
          placeholder="blur"
          blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
        />
      </div>
      {renderNavMenu()}
    </nav>
  )
}

export default NavBar

const NavProfileItem = ({ profileData, onClick }) => {
  return (
    <div
      className={tw(
        "flex flex-row items-center",
        "mb-[10px]",
        "cursor-pointer hover:underline"
      )}
      onClick={onClick}
    >
      <Image
        className="object-contain rounded-[5px]"
        src={require("@assets/images/" + profileData?.profileImage)}
        alt={profileData?.profileName}
        loading="eager"
        priority
        width={32}
        height={32}
        quality={50}
      />
      <div className="flex flex-1 ml-[10px]">{profileData?.profileName}</div>
      {
        profileData?.isLocked && (
          <LockClosedIcon width={18} />
        )
      }
    </div>
  )
}
