import { createSelector } from 'reselect'

export const getSearchItem = (state, props) => state.search.lastResult ? state.search.lastResult.entities[state.search.selectedSeachMenuBarItem][props.id] : null;
export const getCurrentResultType = state => state.search.selectedSeachMenuBarItem;
export const getSearchResult = state => state.search.lastResult ? state.search.lastResult.result[state.search.selectedSeachMenuBarItem] : null;
export const getSearchItemName = createSelector(getSearchItem, searchItem => searchItem ? searchItem.name : null);
export const getSearchItemPrimaryContext = createSelector(getSearchItem, searchItem => {
  if (!searchItem) {
    return null;
  }

  return searchItem.artists ? searchItem.artists.reduce((artists, artist, currentIndex) => artists += currentIndex === 0 ? `${artist.name}` : `, ${artist.name}`, '') : null
});
export const getSearchItemCoverArtUrl = createSelector(getSearchItem, searchItem => {
  if (!searchItem) {
    return null;
  }

  return searchItem.images ? searchItem.images[searchItem.images.length-1].url : searchItem.album.images[searchItem.album.images.length-1].url
});
