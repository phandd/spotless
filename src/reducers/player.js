import { PLAYER as actionTypes } from '../constants/actionTypes'

const defaultState = {
  playback: null,
  availableDevices: [],
  activeDevice: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYBACK_DATA_SUCCESS:
      return { ...state, playback: action.response }

    case actionTypes.FETCH_AVAILABLE_DEVICES_SUCCESS:
      const activeDevice = action.response.find(device => device["is_active"])

      return { ...state, availableDevices: action.response, activeDevice: activeDevice || null }

    case actionTypes.TRANSFER_PLAYBACK_SUCCESS:
      return { ...state, activeDevice: action.device }

    case actionTypes.START_PLAYBACK_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          "is_playing": true
        }
      }

    case actionTypes.PAUSE_PLAYBACK_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          "is_playing": false
        }
      }

    case actionTypes.TOGGLE_SHUFFLE_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          "shuffle_state": action.shuffleState
        }
      }

    case actionTypes.SET_REPEAT_MODE_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          "repeat_state": action.repeatState
        }
      }

    default:
      return state
  }
}
