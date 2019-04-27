import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchField from '../components/SearchField'
import SearchMenuBar from '../components/SearchMenuBar'
import { getSearchResult, getCurrentResultType, getLastSearch, getSearchStatus } from '../selectors/search'
import { doSearch, loadMore } from '../actions/search'
import SearchResultViewer from '../components/SearchResultViewer'

class SearchContainer extends Component {
  render() {
    const { doSearch, result, resultType, lastSearch, loadMore, searching } = this.props

    return(
      <div>
        <SearchField onSearch={keyword => doSearch(keyword)} lastSearch={lastSearch}></SearchField>
        <SearchMenuBar></SearchMenuBar>
        <SearchResultViewer result={result} resultType={resultType} onLoadMore={loadMore} searching={searching}></SearchResultViewer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  result: getSearchResult(state),
  resultType: getCurrentResultType(state),
  lastSearch: getLastSearch(state),
  searching: getSearchStatus(state),
})

export default connect(mapStateToProps, {
  doSearch,
  loadMore
})(SearchContainer)
