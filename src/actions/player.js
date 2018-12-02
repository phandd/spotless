import { callApiThunk } from '../utils/api'
import {
  getAvailableDevicesEndpoint,
  transferPlaybackEndpoint,
  getPlaybackDataEndpoint,
  startPlaybackEndpoint,
  pausePlaybackEndpoint,
  toggleShuffleEndpoint,
  setRepeatMode,
  skipNext, skipPrevious
} from '../endpoints/player'
import { PLAYER as actionTypes } from '../constants/actionTypes';

// A thunk to fetch available devices
const _fetchAvailableDevices = () => dispatch => {
  return dispatch(callApiThunk({
    endpoint: getAvailableDevicesEndpoint(),
    method: 'GET',
    types: [ actionTypes.FETCH_AVAILABLE_DEVICES_REQUEST, actionTypes.FETCH_AVAILABLE_DEVICES_SUCCESS, actionTypes.FETCH_AVAILABLE_DEVICES_FAILURE ],
    responseSelector: 'devices'
  }))
}

// A thunk to fetch player data. This need to be a
// thunk because we want api calls to be called in order.
//
// A transfer playback api will only called to activate
// the first device in the available device list if there is
// no active device. Therefore it only being called after
// available devices api is returned.
//
// Same with fetch playing track, it only being called
// when there's an activating device
export const fetchPlayerData = () => (dispatch, getState) => {
  dispatch(_fetchAvailableDevices())
    .then(() => {
      if (!getState().player.availableDevices.length) {
        return Promise.reject('No device available')
      }

      if (!getState().player.activeDevice) {
        return dispatch(callApiThunk({
          endpoint: transferPlaybackEndpoint(),
          method: 'PUT',
          types: [ actionTypes.TRANSFER_PLAYBACK_REQUEST, actionTypes.TRANSFER_PLAYBACK_SUCCESS, actionTypes.TRANSFER_PLAYBACK_FAILURE ],
          body: {
            "device_ids": [
              getState().player.availableDevices[0].id
            ]
          }
        }, { device: getState().player.availableDevices[0] }))
      }

      return Promise.resolve()
    })
    // Timeout is needed because transfer playback is done a bit slow by Spotify despite that it already returns 204
    .then(() => setTimeout(() => {
        return dispatch(callApiThunk({
          endpoint: getPlaybackDataEndpoint(),
          method: 'GET',
          types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
        }))
      }, 500)
    )
}

export const onTogglePlay = () => (dispatch, getState) => {
  if (getState().player.playback["is_playing"]) {
    return dispatch(callApiThunk({
      endpoint: pausePlaybackEndpoint(),
      method: 'PUT',
      types: [ actionTypes.PAUSE_PLAYBACK_REQUEST, actionTypes.PAUSE_PLAYBACK_SUCCESS, actionTypes.PAUSE_PLAYBACK_FAILURE ]
    }))
  }

  return dispatch(callApiThunk({
    endpoint: startPlaybackEndpoint(),
    method: 'PUT',
    types: [ actionTypes.START_PLAYBACK_REQUEST, actionTypes.START_PLAYBACK_SUCCESS, actionTypes.START_PLAYBACK_FAILURE ]
  }))
}

export const onToggleShuffle = () => (dispatch, getState) => {
  return dispatch(callApiThunk({
    endpoint: toggleShuffleEndpoint(!getState().player.playback["shuffle_state"]),
    method: 'PUT',
    types: [ actionTypes.TOGGLE_SHUFFLE_REQUEST, actionTypes.TOGGLE_SHUFFLE_SUCCESS, actionTypes.TOGGLE_SHUFFLE_FAILURE ]
  }, { shuffleState: !getState().player.playback["shuffle_state"] }))
}

export const onSetRepeatMode = () => (dispatch, getState) => {
  const modes = ['off', 'context', 'track']
  const nextMode = (() => {
    const currentModeIndex = modes.indexOf(getState().player.playback["repeat_state"]);

    return currentModeIndex === 2 ? modes[0] : modes[currentModeIndex + 1]
  })();

  return dispatch(callApiThunk({
    endpoint: setRepeatMode(nextMode),
    method: 'PUT',
    types: [ actionTypes.SET_REPEAT_MODE_REQUEST, actionTypes.SET_REPEAT_MODE_SUCCESS, actionTypes.START_PLAYBACK_FAILURE ]
  }, { repeatState: nextMode }))
}

export const onSkipNext = () => (dispatch) => {
  return dispatch(callApiThunk({
    endpoint: skipNext(),
    method: 'POST',
    types: [ actionTypes.SKIP_NEXT_REQUEST, actionTypes.SKIP_NEXT_SUCCESS, actionTypes.SKIP_NEXT_FAILURE ]
  }))
    .then(setTimeout(() => {
      return dispatch(callApiThunk({
        endpoint: getPlaybackDataEndpoint(),
        method: 'GET',
        types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
      }))
    }, 500))
}

export const onSkipPrevious = () => (dispatch) => {
  return dispatch(callApiThunk({
    endpoint: skipPrevious(),
    method: 'POST',
    types: [ actionTypes.SKIP_PREVIOUS_REQUEST, actionTypes.SKIP_PREVIOUS_SUCCESS, actionTypes.SKIP_PREVIOUS_FAILURE ]
  }))
    .then(setTimeout(() => {
      return dispatch(callApiThunk({
        endpoint: getPlaybackDataEndpoint(),
        method: 'GET',
        types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
      }))
    }, 500))
}
