import DefaultProfileImage from "@assets/images/newprofile.png";

class UserProfileModel {
  constructor() {
    this.profileId = 0;
    this.profileImage = DefaultProfileImage;
    this.profileName = "";
    this.profilePassword = "";
    this.isLocked = false;
    this.autoPlayNextEp = true;
    this.autoPlayPreviews = true;
  }
}

export default UserProfileModel;