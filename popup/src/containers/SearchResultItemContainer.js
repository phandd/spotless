import React from 'react'
import { connect } from 'react-redux'
import MediaListItem from '../components/MediaListItem'
import { getSearchItemName, getSearchItemPrimaryContext, getSearchItemCoverArtUrl, getSearchItemPlayingStatus } from '../selectors/search'
import { playItem } from '../actions/search'
import { pause } from '../actions/player'

const mapStateToProps = () => {
  const getName = getSearchItemName()
  const getPrimaryContext = getSearchItemPrimaryContext()
  const getCoverArtUrl = getSearchItemCoverArtUrl()
  const getPlayingStatus = getSearchItemPlayingStatus()

  return (state, props) => ({
    name: getName(state, props),
    primaryContext: getPrimaryContext(state, props),
    coverArtUrl: getCoverArtUrl(state, props),
    playing: getPlayingStatus(state, props)
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlay: () => dispatch(playItem(ownProps)),
  onPause: () => dispatch(pause())
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaListItem)