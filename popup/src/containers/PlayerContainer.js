import React, { Component } from 'react'
import Player from '../components/Player'
import NoDevice from '../components/NoDevice'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import {
  fetchPlayerData,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious,
  onSetVolume,
  onVolumeMuteToggle
} from '../actions/player'
import { getTokenFromCookie } from '../actions/auth'
import { onToggleTrackFavorite } from '../actions/track'
import { getPlayerControlState, getPlayingTrackData, getDeviceAvailability, getLoadingStatus, getTrackInfoLoadingStatus } from '../selectors/player';

class PlayerContainer extends Component {
  componentDidMount() {
    this.props.fetchPlayerData();
  }

  render() {
    const { playingTrackData, noDevice, loading, trackInfoLoading } = this.props

    if (noDevice) {
      return(
        <div>
           <Loading loading={loading} />
           <NoDevice />
        </div>
      )
    }

    return (
      <div>
        <Loading loading={loading}/>
        {
          playingTrackData ? <Player {...this.props}/> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playingTrackData: getPlayingTrackData(state),
    playerControlState: getPlayerControlState(state),
    noDevice: !getDeviceAvailability(state),
    loading: getLoadingStatus(state),
    trackInfoLoading: getTrackInfoLoadingStatus(state)
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
  onSetVolume,
  onVolumeMuteToggle
})(PlayerContainer)