import { callApiThunk } from '../utils/api'
import playerEndpointGetters from '../endpoints/player'
import { PLAYER as actionTypes } from '../constants/actionTypes';

export const getPlaybackData = () => dispatch => {
  return dispatch(callApiThunk({
    endpoint: playerEndpointGetters.getPlaybackDataEndpoint(),
    method: 'GET',
    types: [ actionTypes.FETCH_PLAYBACK_DATA_REQUEST, actionTypes.FETCH_PLAYBACK_DATA_SUCCESS, actionTypes.FETCH_PLAYBACK_DATA_FAILURE ]
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

export const onVolumeMuteToggle = () => (dispatch, getState) => {
  const mute = !!getState().player.playback.device["volume_percent"];
  const percent = mute ? 0 : (getState().player.playback.device["previous_volume_percent"] || 50)

  return dispatch(onSetVolume(percent))
}
