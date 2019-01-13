import { combineReducers } from 'redux'
import menubar from './menubar'
import player from './player'
import search from './search'
import auth from './auth'

const rootReducer = combineReducers({
  menubar,
  player,
  search,
  auth,
})

export default rootReducer