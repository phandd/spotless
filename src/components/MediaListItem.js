import React from 'react'

const MediaListItem = ({ name, primaryContext, secondaryContext, coverArtUrl }) => {
  return (
    <div className="media-list-item">
      <div className="item-cover-art" style={{"backgroundImage" : `url(${coverArtUrl})`}}></div>
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