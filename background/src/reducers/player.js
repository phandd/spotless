import { PLAYER as actionTypes } from '../constants/actionTypes'
import { TRACK as trackActionTypes } from '../constants/actionTypes'

const defaultState = {
  playback: null,
  availableDevices: null,
  activeDevice: null,
  loading: true,
  track_info_loading: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYBACK_DATA_SUCCESS:
      return {
        ...state,
        playback: action.response,
        availableDevices: [action.response.device],
        activeDevice: action.response.device
       }

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

    case trackActionTypes.CHECK_TRACK_IS_FAVORITED_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          item: {
            ...state.playback.item,
            "is_favorite": action.response[0]
          }
        }
      }

    case trackActionTypes.TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        playback: {
          ...state.playback,
          item: {
            ...state.playback.item,
            "is_favorite": !state.playback.item["is_favorite"]
          }
        }
      }

    case actionTypes.SET_VOLUME_REQUEST:
      const mute = action.to === 0 ? true : false
      const playback = {
        ...state.playback,
        device: {
          ...state.playback.device,
          "volume_percent": action.to
        }
      }

      if (mute) {
        playback.device["previous_volume_percent"] = action.from
      }

      return {
        ...state,
        playback
      }

    case actionTypes.PLAYER_LOAD_LOADING:
      return {
        ...state,
        loading: true
      }

    case actionTypes.PLAYER_LOAD_DONE:
      return {
        ...state,
        loading: false
      }

    case actionTypes.TRACK_INFO_LOADING:
    return {
      ...state,
      track_info_loading: true
    }

    case actionTypes.TRACK_INFO_LOAD_DONE:
      return {
        ...state,
        track_info_loading: false
      }

    default:
      return state
  }
}
