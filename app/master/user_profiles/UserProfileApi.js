import UserProfileModel from "@models/UserProfileModel";
import UserProfileData from "./UserProfileData";

class UserProfileApi {

  /**
   * 
   * @param {UserProfileModel} userProfile 
   */
  static updateUserProfile(userProfile) {
    let findUpdateIndex = UserProfileData.findIndex(item => item.profileId === userProfile.profileId);
    if(findUpdateIndex > -1) {
      UserProfileData[findUpdateIndex] = userProfile;
    }
  }

  /**
   * 
   * @param {String} profileName 
   */
  static addUserProfile(profileName) {

    if(UserProfileData.length + 1 > 4) {
      alert("Cannot add new profile (maximun is 4 profiles)");
      return;
    }

    let userProfile = new UserProfileModel();
    userProfile.profileId = UserProfileData.length + 1;
    userProfile.profileName = profileName;
    UserProfileData.push(userProfile);
  }

  /**
   * 
   * @param {Number} profileId 
   * @returns 
   */
  static getUserProfileById(profileId) {
    try {
      return UserProfileData.find(item => item.profileId === parseInt(profileId));
    } catch (error) {
      return undefined;
    }
  }
}

export default UserProfileApi;