import React, { Component } from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'
import {
  fetchPlayerData,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious
} from '../actions/player'
import { getPlayerControlState, getPlayingTrackData } from '../selectors/player';

class PlayerContainer extends Component {
  componentDidMount() {
    const { fetchPlayerData } = this.props

    fetchPlayerData()
  }

  render() {
    return (
      this.props.playingTrackData ? <Player {...this.props}/> : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playingTrackData: getPlayingTrackData(state),
    playerControlState: getPlayerControlState(state)
  }
}

export default connect(mapStateToProps, {
  fetchPlayerData,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious
})(PlayerContainer)