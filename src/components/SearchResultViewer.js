import React from 'react'
import SearchResultItemContainer from '../containers/SearchResultItemContainer'

const SearchResultViewer = ({ result, resultType }) => {
  const items = result ? result.items.map(itemId => <SearchResultItemContainer id={itemId} type={resultType} key={itemId}/>) : [];

  return (
    <div className="search-result-viewer">
      {items}
    </div>
  )
}

export default SearchResultViewer