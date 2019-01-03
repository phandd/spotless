import { callApiThunk } from '../utils/api'
import { SEARCH as actionTypes } from '../constants/actionTypes'
import searchEndpointGetters from '../endpoints/search'
import { getSearchItemUri, getSearchItem } from '../selectors/search'
import { play } from './/player'
import { schema } from 'normalizr'

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

// Denormalize state shape so later when we need
// to update one item in result list, we don't
// have to re-render the whole list
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
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

export const loadMore = resultType => (dispatch, getState) => {
  return dispatch(callApiThunk({
    endpoint: getState().search.lastResult.result[resultType].next,
    schema: searchSchema,
    method: 'GET',
    types: [ actionTypes.SEARCH_LOAD_MORE_REQUEST, actionTypes.SEARCH_LOAD_MORE_SUCCESS, actionTypes.SEARCH_LOAD_MORE_FAILURE]
  }))
}

// Use selector inside a thunk, because we can not access
// state inside mapDispatchToProps (https://github.com/reduxjs/react-redux/issues/211)
// to get the uri of search item from the state itself to directly dispatch play action
// from player in. We need to then use the selector along with 
// thunk's getState to get the uri of search item
// (https://github.com/reduxjs/reselect/issues/293)
export const playItem = props => (dispatch, getState) => {
  return dispatch(play(getSearchItem(getState(), props)))
}
