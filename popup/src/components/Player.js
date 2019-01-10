import React from 'react'
import MediaObject from './MediaObject'
import PlayerControl from './PlayerControl'

const Player = ({
  playingTrackData,
  playerControlState,
  ...playerControlActions
}) => {
  return(
    <div className='player'>
      <div className='player-media-object'>
        <MediaObject {...playingTrackData}/>
      </div>
      <div className='player-player-control'>
        <PlayerControl {...playerControlState} {...playerControlActions}/>
      </div>
    </div>
  )
};

export default Player