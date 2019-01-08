import trackEndpointGetters from '../endpoints/track'
import { callApiThunk } from '../utils/api'
import { TRACK as actionTypes } from '../constants/actionTypes';

export const checkTrackIsFavorited = id => dispatch => {
  return dispatch(callApiThunk({
    endpoint: trackEndpointGetters.checkTrackIsFavorited(id),
    types: [actionTypes.CHECK_TRACK_IS_FAVORITED_REQUEST, actionTypes.CHECK_TRACK_IS_FAVORITED_SUCCESS, actionTypes.CHECK_TRACK_IS_FAVORITED_FAILURE],
    method: 'GET'
  }))
}

export const onToggleTrackFavorite = () => (dispatch, getState) => {
  const isFavorite = getState().player.playback.item["is_favorite"]

  return dispatch(callApiThunk({
    endpoint: trackEndpointGetters.toggleTrackFavorite(getState().player.playback.item.id),
    types: [actionTypes.TOGGLE_FAVORITE_REQUEST, actionTypes.TOGGLE_FAVORITE_SUCCESS, actionTypes.TOGGLE_FAVORITE_FAILURE],
    method: isFavorite ? 'DELETE' : 'PUT'
  }))
}