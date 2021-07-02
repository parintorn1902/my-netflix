import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    profileData: null,
    launchProfileData: null,
    preLaunchProfileData: null,
    searchFilter: ""
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    setLaunchProfile: (state, action) => {
      state.launchProfileData = action.payload;
    },
    setPreLaunchProfile: (state, action) => {
      state.preLaunchProfileData = action.payload;
    }
  },
})

export const { setProfile, setSearchFilter, setLaunchProfile, setPreLaunchProfile } = globalSlice.actions

export default globalSlice.reducer