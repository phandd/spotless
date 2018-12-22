import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaListItem from '../components/MediaListItem'
import { getSearchItemName, getSearchItemPrimaryContext, getSearchItemCoverArtUrl } from '../selectors/search'

const mapStateToProps = (state, ownProps) => ({
  name: getSearchItemName(state, ownProps),
  primaryContext: getSearchItemPrimaryContext(state, ownProps),
  coverArtUrl: getSearchItemCoverArtUrl(state, ownProps)
})

export default connect(mapStateToProps)(MediaListItem)