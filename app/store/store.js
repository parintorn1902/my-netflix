import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import globalSlice from './slice/globalSlice'

export default configureStore({
  reducer: {
    global: globalSlice
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})