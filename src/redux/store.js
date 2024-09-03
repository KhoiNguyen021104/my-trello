import { combineReducers } from 'redux'
import { dashboardPageContentReducer } from './reducers/dashboardPageContentReducer'
import { notificationReducer } from './reducers/notificationReducer'

const allReducers = combineReducers({
  dashboardPageContentReducer,
  notificationReducer
})

export default allReducers