import Image from "next/image";
import NetflixLogo from "@assets/images/logo.png";
import tw from "@utils/Tailwind";
import { SearchIcon } from "@heroicons/react/outline";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { createRef, useEffect } from "react";

function NavBar({ profileData }) {

  const navRef = createRef();

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

  const renderNavMenu = () => {
    const inactiveListItemClasses = "cursor-pointer hover:text-[#b3b3b3] transition-all duration-300";
    const rightMenuIconClass = "text-white";
    if (profileData) {
      return (
        <>
          <ul
            className={tw(
              "inline-flex md:hidden",
              "space-x-[1vw] pl-[2.2vw]",
              "text-[.75vw] 2xl:text-[14px] text-white font-normal"
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
              "h-full right-[60px] 2xl:right-[4%] top-0 space-x-[20px]"
            )}
          >
            <SearchIcon className={rightMenuIconClass} width={25} />
            <BellIcon className={rightMenuIconClass} width={25} />
            <div
              className={tw(
                "group flex flex-row",
                "space-x-1"
              )}
            >
              {
                profileData?.profileImage && (
                  <Image
                    className="rounded-sm"
                    src={profileData.profileImage}
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
        "w-full h-[68px] md:h-[41px]",
        "bg-gradient-to-b from-[#000000aa] via-[#00000050] to-transparent",
        "transition-all duration-300"
      )}
    >
      <div
        className={tw(
          "ml-[3.2vw] w-[90px] md:w-[65px]"
        )}
      >
        <Image
          className="object-contain"
          src={NetflixLogo}
          alt="Logo"
          layout="responsive"
          objectFit="fill"
        />
      </div>
      {renderNavMenu()}
    </nav>
  )
}

export default NavBar
