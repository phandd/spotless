import React from 'react'
import MediaObject from './MediaObject'
import PlayerControl from './PlayerControl'

const Player = () => {
  return(
    <div className='player'>
      <div className='player-media-object'>
        <MediaObject />
      </div>
      <div className='player-player-control'>
        <PlayerControl />
      </div>
    </div>
  )
};

export default Player