import { createSelector } from 'reselect'
import { getPlayback, getPlayerControlState } from './player'

export const getSearchItem = (state, props) => state.search.lastResult ? state.search.lastResult.entities[props.type][props.id] : null;
export const getCurrentResultType = state => state.search.selectedSeachMenuBarItem;
export const getSearchResult = state => state.search.lastResult ? state.search.lastResult.result[state.search.selectedSeachMenuBarItem] : null;
export const getSearchItemName = () => createSelector(getSearchItem, searchItem => searchItem ? searchItem.name : null);
export const getSearchItemPrimaryContext = () => createSelector([getSearchItem], searchItem => {
  if (!searchItem) {
    return null;
  }

  return searchItem.artists ? searchItem.artists.reduce((artists, artist, currentIndex) => artists += currentIndex === 0 ? `${artist.name}` : `, ${artist.name}`, '') : null
});
export const getSearchItemCoverArtUrl = () => createSelector(getSearchItem, searchItem => {
  if (!searchItem) {
    return null;
  }

  return searchItem.images ? searchItem.images[searchItem.images.length-1].url : searchItem.album.images[searchItem.album.images.length-1].url
});
export const getSearchItemUri = createSelector(getSearchItem, searchItem => searchItem ? searchItem.uri : null)
export const getSearchItemPlayingStatus = () => createSelector(getSearchItem, getPlayback, getPlayerControlState, (searchItem, playback, playerStates) => {
  if (!playerStates || !playerStates.playing || !searchItem || !playback || !playback.item) {
    return false
  }
  // if playback.context exist, means the playback
  // is currently playing a list (album, playlist...)
  // If it's not, the playback is currently
  // playing a track

  if (playback.context) {
    return playback.context.uri === searchItem.uri
  }

  return searchItem.id === playback.item.id
})
export const getLastSearch = state => state.search.lastSearch
export const getSearchStatus = state => state.search.searching