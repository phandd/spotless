import { combineReducers } from 'redux'
import menubar from './menubar'
import player from './player'
import search from './search'

const rootReducer = combineReducers({
  menubar,
  player,
  search,
})

export default rootReducer