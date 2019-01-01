import React from 'react'

const MediaListItem = ({ name, primaryContext, secondaryContext, coverArtUrl, onPlay, onPause, playing }) => {
  const button = playing ? 
  <button className="item-play-button" onClick={() => onPause()}>
    <div className='icon-pause'></div>
  </button>
  :
  <button className="item-play-button" onClick={() => onPlay()}>
    <div className='icon-play'></div>
  </button>
  return (
    <div className="media-list-item">
    <div className="item-cover-art">
      <div className="item-cover-art-image" style={{"backgroundImage" : `url(${coverArtUrl})`}}></div>
      <div className='item-button'>
        {button}
      </div>
    </div>
      <div className="item-info">
        <div className="info-name">{name}</div>
        <div className="info-context">
          <div className="context-primary">{primaryContext}</div>
          { secondaryContext && <div className="context-secondary">{secondaryContext}</div> }
        </div>
      </div>
    </div>
  )
}

export default MediaListItem