import React from 'react'

const PlayerControl = () => {
  return(
    <div className='player-control'>
      <button className='control-button icon-shuffle'></button>
      <button className='control-button icon-skip-back'></button>
      <button className='control-button icon-play'></button>
      <button className='control-button icon-skip-forward'></button>
      <button className='control-button icon-repeat'></button>
    </div>
  )
}

export default PlayerControl