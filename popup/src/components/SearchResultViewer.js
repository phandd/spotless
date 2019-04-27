import React from 'react'
import SearchResultItemContainer from '../containers/SearchResultItemContainer'
import Loading from '../components/Loading'


const SearchResultViewer = ({ result, resultType, onLoadMore, searching }) => {
  const items = result ? result.items.map(itemId => <SearchResultItemContainer id={itemId} type={resultType} key={itemId}/>) : [];
  const next = result && result.next

  return (
    <div className="search-result-wrapper">
      <div className="search-result-loader">
        <Loading loading={searching} />
      </div>

      <div className={"search-result " + (searching ? "searching" : "")}>
      <div className="search-result-viewer">
        {items}
      </div>
      {
        next ?
        <div className="search-load-more-button">
          <button onClick={() => onLoadMore(resultType)}>load more</button>
        </div> : null
      }
    </div>
    </div>
  )
}

export default SearchResultViewer