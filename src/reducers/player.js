import { PLAYER as actionTypes } from '../constants/actionTypes'

const defaultState = {
  playingTrack: {}
}

export default (state = defaultState, action) => {
  if (action.type === actionTypes.FETCH_PLAYING_TRACK_SUCCESS) {
    return { ...state, playingTrack: action.response }
  }

  return state
}