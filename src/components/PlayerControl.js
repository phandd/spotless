import React from 'react'
import {onSkipPrevious} from '../actions/player';

const PlayerControl = ({
  repeat,
  shuffle,
  playing,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious
}) => {
  return(
    <div className='player-control'>
      <button className={ 'control-button icon-shuffle ' + (shuffle ? 'active' : '') }
              onClick={onToggleShuffle}>
      </button>
      <button className='control-button icon-skip-back'
              onClick={onSkipPrevious}>
      </button>
      <button className={ 'control-button ' + (playing ? 'icon-pause' : 'icon-play') }
              onClick={onTogglePlay}>
      </button>
      <button className='control-button icon-skip-forward'
              onClick={onSkipNext}>
      </button>
      <button className={ 'control-button icon-repeat-' + repeat + (repeat === 'off' ? '' : ' active') }
              onClick={onSetRepeatMode}>
      </button>
    </div>
  )
}

export default PlayerControl