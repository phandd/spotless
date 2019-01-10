import { callApiThunk } from '../utils/api';
import actionTypes from '../constants/actionTypes'
import playlistEndpointGetters from '../endpoints/playlist'

export const fetchQueue = () => (dispatch, getState) => {
  const currentPlaylist = getState().player.playback.context && getState().player.playback.context;
  return dispatch(callApiThunk({
    // endpoint: playlistEndpointGetters.getPlaylist(getState().player.)
  }))
}
