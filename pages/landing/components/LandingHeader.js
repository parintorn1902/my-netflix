import Image from "next/image";
import NetflixLogo from "@assets/images/netflix-logo.png";
import tw from "@utils/Tailwind";

function LandingHeader() {
  return (
    <header
      className={tw(
        "absolute", 
        "z-50 left-[3em] top-[1.1em] w-[90px] lg:left-[20px] lg:top-[20px]"
      )}
    >
      <Image
        className="object-contain"
        src={NetflixLogo}
        alt="Logo"
        layout="responsive"
        objectFit="fill"
      />
    </header>
  )
}

export default LandingHeader
