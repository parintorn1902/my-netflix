import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './slice/profileSlice'

export default configureStore({
  reducer: {
    profile: profileSlice
  },
})