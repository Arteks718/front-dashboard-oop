import { configureStore } from '@reduxjs/toolkit'
import leadsReducer from './slice/leadsSlice'
import salesManagersReducer from './slice/salesManagersSlice'

const reducer = {
  leadsData: leadsReducer,
  salesManagersData: salesManagersReducer
}

const store = configureStore({ reducer })
export default store
