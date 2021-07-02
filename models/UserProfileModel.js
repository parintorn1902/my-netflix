class UserProfileModel {
  constructor() {
    this.profileId = 0;
    this.profileImage = "newprofile.png";
    this.profileName = "";
    this.profilePassword = "";
    this.isLocked = false;
    this.autoPlayNextEp = true;
    this.autoPlayPreviews = true;
  }
}

export default UserProfileModel;