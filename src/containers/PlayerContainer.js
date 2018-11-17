import React, { Component } from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'
import { fetchPlayingTrack } from '../actions/player'

class PlayerContainer extends Component {
  componentDidMount() {
    const { fetchPlayingTrack } = this.props

    fetchPlayingTrack()
  }

  render() {
    const { track } = this.props

    return (
      <Player />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  track: state.player.currentlyPlayingTrack
})

export default connect(mapStateToProps, {
  fetchPlayingTrack
})(PlayerContainer)