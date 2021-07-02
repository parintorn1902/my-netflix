import UserProfileModel from "@models/UserProfileModel";
import { setLaunchProfile, setPreLaunchProfile, setProfile } from "../slice/globalSlice"
import store from "../store"

class GlobalManager {

  /**
   * 
   * @param {UserProfileModel} profileData 
   */
  static setProfile(profileData) {
    store.dispatch(setProfile(profileData));
  }

  /**
   * 
   * @param {UserProfileModel} profileData 
   */
  static setLaunchProfile(profileData) {
    store.dispatch(setLaunchProfile(profileData));
  }

  /**
   * 
   * @param {UserProfileModel} profileData 
   */
  static setPreLaunchProfile(profileData) {
    store.dispatch(setPreLaunchProfile(profileData));
  }

  static clearAll() {
    store.dispatch(setProfile(null));
    store.dispatch(setLaunchProfile(null));
    store.dispatch(setPreLaunchProfile(null));
  }
}

export default GlobalManager