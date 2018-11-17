import { CALL_API } from '../middleware/api'
import { currentlyPlayingTrack as getCurrentPlayingTrackApiEnpoint } from '../endpoints/player'
import { trackSchema } from '../schemas'
import { PLAYER as actionTypes } from '../constants/actionTypes';

export const fetchPlayingTrack = () => ({
  [CALL_API]: {
    endpoint: getCurrentPlayingTrackApiEnpoint(),
    method: 'GET',
    schema: trackSchema,
    types: actionTypes.FETCH_PLAYING_TRACK_REQUEST,
  }
})

export const getAvailableDevices = () => ({

})
