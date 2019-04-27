import React from 'react'
import {onSkipPrevious} from '../actions/player';

const PlayerControl = ({
  repeat,
  shuffle,
  playing,
  favorite,
  volume,
  onTogglePlay,
  onToggleShuffle,
  onSetRepeatMode,
  onSkipNext,
  onSkipPrevious,
  onToggleTrackFavorite,
  onSetVolume,
  onVolumeMuteToggle
}) => {
  let volumeInput = React.createRef()
  let volumeProgressBar = React.createRef()

  function handleMouseUp() {
     onSetVolume(volumeInput.current.value)
  }

  function onInput(e) {
    volumeProgressBar.current.style = `width: ${e.target.value}%`
  }


  return(
    <div className='player-control'>
      <div>
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
      <div className="extended-controls">
        <button className={ 'control-button icon-heart ' + (favorite ? 'active' : '') }
                onClick={onToggleTrackFavorite}>
        </button>
        <div className="volume-bar">
           <button className={ 'control-button ' + (volume === 0 ? 'icon-volume-off' : 'icon-volume')} 
                   onClick={onVolumeMuteToggle}></button>
           <div className="progress-bar" onMouseUp={handleMouseUp}>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-fg" style={{"width": `${volume}%`}} ref={volumeProgressBar}></div>
                <input key={volume} className="progress-bar-bg" type="range" min="0" max="100" defaultValue={volume} ref={volumeInput} onInput={onInput}/>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerControl