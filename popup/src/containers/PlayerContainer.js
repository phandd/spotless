import React, { Component } from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'
import {
  fetchPlayerData,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious,
  onSetVolume
} from '../actions/player'
import { getTokenFromCookie } from '../actions/auth'
import { onToggleTrackFavorite } from '../actions/track'
import { getPlayerControlState, getPlayingTrackData } from '../selectors/player';

class PlayerContainer extends Component {
  componentDidMount() {
    this.props.fetchPlayerData();
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
  getTokenFromCookie,
  fetchPlayerData,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious,
  onToggleTrackFavorite,
  onSetVolume
})(PlayerContainer)