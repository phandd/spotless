import React from 'react'
import MediaObject from './MediaObject'
import PlayerControl from './PlayerControl'
import Loading from '../components/Loading'

const Player = ({
  playingTrackData,
  playerControlState,
  trackInfoLoading,
  ...playerControlActions
}) => {
  return(
    <div className='player'>
      <div className='player-media-object'>
        <Loading loading={trackInfoLoading}/>
        <MediaObject {...playingTrackData}/>
      </div>
      <div className='player-player-control'>
        <PlayerControl {...playerControlState} {...playerControlActions}/>
      </div>
    </div>
  )
};

export default Player