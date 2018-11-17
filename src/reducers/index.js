import { combineReducers } from 'redux'
import menubar from './menubar'
import player from './player'

const rootReducer = combineReducers({
  menubar,
  player,
})

export default rootReducer