import React from 'react'
import SeachMenuBarItemContainer from '../containers/SearchMenuBarItemContainer'
import { SEARCH_TYPES } from '../constants/search'

const SearchMenuBar = () => {
  return(
    <div className="search-menu-bar">
      <SeachMenuBarItemContainer item={SEARCH_TYPES.TRACKS}>Songs</SeachMenuBarItemContainer>
      <SeachMenuBarItemContainer item={SEARCH_TYPES.ALBUMS}>Albums</SeachMenuBarItemContainer>
      <SeachMenuBarItemContainer item={SEARCH_TYPES.PLAYLISTS}>Playlists</SeachMenuBarItemContainer>
  </div>
  )
}

export default SearchMenuBar