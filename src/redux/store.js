import { combineReducers } from 'redux'
import { dashboardPageContentReducer } from './reducers/dashboardPageContentReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { userInfoReducer } from './reducers/userInfoReducer'

const allReducers = combineReducers({
  dashboardPageContentReducer,
  notificationReducer,
  userInfoReducer
})

export default allReducers