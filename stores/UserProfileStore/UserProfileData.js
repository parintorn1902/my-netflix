import RedImage from "@assets/images/red.png";
import MangoImage from "@assets/images/mango.png";
import BartlebyImage from "@assets/images/bartleby.png";
import RobotImage from "@assets/images/robot.png";

const UserProfileData = [
  {
    profileId: 1,
    profileName: "Red",
    profileImage: RedImage,
    profilePassword: "1234",
    isLocked: true,
    autoPlayNextEp: true,
    autoPlayPreviews: true
  },
  {
    profileId: 2,
    profileName: "Mango",
    profileImage: MangoImage,
    profilePassword: "1111",
    isLocked: true,
    autoPlayNextEp: true,
    autoPlayPreviews: true
  },
  {
    profileId: 3,
    profileName: "Bartleby",
    profileImage: BartlebyImage,
    profilePassword: "1122",
    isLocked: true,
    autoPlayNextEp: true,
    autoPlayPreviews: true
  },
  // {
  //   profileId: 4,
  //   profileName: "Robot",
  //   profileImage: RobotImage,
  //   profilePassword: null,
  //   isLocked: false,
  //   autoPlayNextEp: true,
  //   autoPlayPreviews: true
  // },
]

export default UserProfileData;