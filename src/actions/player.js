import { callApiThunk } from '../utils/api'
import playerEndpointGetters from '../endpoints/player'
import { PLAYER as actionTypes } from '../constants/actionTypes';
import { checkTrackIsFavorited } from './track'

// A thunk to fetch available devices
const _fetchAvailableDevices = () => dispatch => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.getAvailableDevicesEndpoint(),
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
          endpoint: playerEndpointGetters.transferPlaybackEndpoint(),
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
    .then(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(callApiThunk({
          endpoint: playerEndpointGetters.getPlaybackDataEndpoint(),
          method: 'GET',
          types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
        }))
        .then(() => resolve())
      }, 1000)
    }))
    .then(() => dispatch(checkTrackIsFavorited(getState().player.playback.item.id)))
}

export const onTogglePlay = () => (dispatch, getState) => {
  if (getState().player.playback["is_playing"]) {
    return dispatch(callApiThunk({
      endpoint: playerEndpointGetters.pausePlaybackEndpoint(),
      method: 'PUT',
      types: [ actionTypes.PAUSE_PLAYBACK_REQUEST, actionTypes.PAUSE_PLAYBACK_SUCCESS, actionTypes.PAUSE_PLAYBACK_FAILURE ]
    }))
  }

  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.startPlaybackEndpoint(),
    method: 'PUT',
    types: [ actionTypes.START_PLAYBACK_REQUEST, actionTypes.START_PLAYBACK_SUCCESS, actionTypes.START_PLAYBACK_FAILURE ]
  }))
}

export const onToggleShuffle = () => (dispatch, getState) => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.toggleShuffleEndpoint(!getState().player.playback["shuffle_state"]),
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
    endpoint: playerEndpointGetters.setRepeatMode(nextMode),
    method: 'PUT',
    types: [ actionTypes.SET_REPEAT_MODE_REQUEST, actionTypes.SET_REPEAT_MODE_SUCCESS, actionTypes.START_PLAYBACK_FAILURE ]
  }, { repeatState: nextMode }))
}

export const onSkipNext = () => (dispatch) => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.skipNext(),
    method: 'POST',
    types: [ actionTypes.SKIP_NEXT_REQUEST, actionTypes.SKIP_NEXT_SUCCESS, actionTypes.SKIP_NEXT_FAILURE ]
  }))
    .then(setTimeout(() => {
      return dispatch(callApiThunk({
        endpoint: playerEndpointGetters.getPlaybackDataEndpoint(),
        method: 'GET',
        types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
      }))
    }, 1000))
}

export const onSkipPrevious = () => (dispatch) => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.skipPrevious(),
    method: 'POST',
    types: [ actionTypes.SKIP_PREVIOUS_REQUEST, actionTypes.SKIP_PREVIOUS_SUCCESS, actionTypes.SKIP_PREVIOUS_FAILURE ]
  }))
    .then(setTimeout(() => {
      return dispatch(callApiThunk({
        endpoint: playerEndpointGetters.getPlaybackDataEndpoint(),
        method: 'GET',
        types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
      }))
    }, 1000))
}

export const play = item => dispatch => {
  const uri = item.uri
  
  if (!uri) {
    throw new Error('Uri is required for playing an item')
  }

  let body;
  
  if (uri.includes('track')) {
    body = {
      uris: [uri]
    }
  } else {
    body = {
      "context_uri": uri
    }
  }

  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.play(),
    method: 'PUT',
    body,
    types: [ actionTypes.PLAY_REQUEST, actionTypes.PLAY_SUCCESS, actionTypes.PLAY_FAILURE ]
  }, {
    item
  }))
  .then(setTimeout(() => {
    return dispatch(callApiThunk({
      endpoint: playerEndpointGetters.getPlaybackDataEndpoint(),
      method: 'GET',
      types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
    }))
  }, 1000))
}

export const pause = () => dispatch => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.pausePlaybackEndpoint(),
    method: 'PUT',
    types: [ actionTypes.PAUSE_PLAYBACK_REQUEST, actionTypes.PAUSE_PLAYBACK_SUCCESS, actionTypes.PAUSE_PLAYBACK_FAILURE ]
  }))
}

export const onSetVolume = percent => (dispatch, getState) => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.setVolumeEndpoint(percent),
    method: 'PUT',
    types: [ actionTypes.SET_VOLUME_REQUEST, actionTypes.SET_VOLUME_SUCCESS, actionTypes.SET_VOLUME_FAILURE ]
  }, {
    from: +getState().player.playback.device["volume_percent"],
    to: +percent
  }))
}