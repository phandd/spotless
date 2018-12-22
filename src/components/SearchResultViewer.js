import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchResult, getCurrentSearchMenu } from '../selectors/search'
import { SEARCH_TYPES } from '../constants/search'
import SearchResultItemContainer from '../containers/SearchResultItemContainer'

const SearchResultViewer = ({ result }) => {
  const items = result ? result.items.map(itemId => <SearchResultItemContainer id={itemId} key={itemId}/>) : [];

  return (
    <div className="search-result-viewer">
      {items}
    </div>
  )
}

export default SearchResultViewer