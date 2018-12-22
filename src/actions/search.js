import { callApiThunk } from '../utils/api'
import { SEARCH as actionTypes } from '../constants/actionTypes'
import searchEndpointGetters from '../endpoints/search'
import { normalize, schema } from 'normalizr'

export const switchSearchMenu = item => ({
  type: actionTypes.SWITCH_SEARCH_MENU,
  item
})

const trackSchema = new schema.Entity('tracks', {}, {
  idAttribute: track => track.id
})

const playlistSchema = new schema.Entity('playlists', {}, {
  idAttribute: playlist => playlist.id
})

const albumSchema = new schema.Entity('albums', {}, {
  idAttribute: album => album.id
})

const searchSchema = new schema.Object({
  tracks: new schema.Object({ items: [trackSchema] }),
  albums: new schema.Object({ items: [albumSchema] }),
  playlists: new schema.Object({ items: [playlistSchema] }),
})

export const doSearch = keyword => dispatch => {
  return dispatch(callApiThunk({
    endpoint: searchEndpointGetters.getSearchEndpoint(keyword),
    schema: searchSchema,
    method: 'GET',
    types: [ actionTypes.SEARCH_REQUEST, actionTypes.SEARCH_SUCCESS, actionTypes.SEARCH_FAILURE ]
  }, { keyword })
  )
}