import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchField from '../components/SearchField'
import SearchMenuBar from '../components/SearchMenuBar'
import { getSearchResult } from '../selectors/search'
import { doSearch } from '../actions/search'
import SearchResultViewer from '../components/SearchResultViewer'

class SearchContainer extends Component {
  render() {
    const { doSearch, result } = this.props

    return(
      <div>
        <SearchField onSearch={keyword => doSearch(keyword)}></SearchField>
        { 
        result && 
        <div>
          <SearchMenuBar></SearchMenuBar>
          <SearchResultViewer result={result}></SearchResultViewer>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  result: getSearchResult(state)
})

export default connect(mapStateToProps, {
  doSearch
})(SearchContainer)
