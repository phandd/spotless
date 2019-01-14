import React from 'react'
import defaultCoverArtUrl from '../../public/images/default.png'

const MediaObject = ({ coverArtUrl, trackName, artists }) => {
  return(
    <div className='media-object'>
      <div className='cover-art' style={{"backgroundImage" : `url(${coverArtUrl || defaultCoverArtUrl})`}} />
      <div className='media-info'>
        <div className='info-name'>
          <span title={trackName}>{trackName || "Cannot load playing track"}</span>
        </div>
        <div className='info-meta'>
        <span title={artists}>{artists || "Media type is not supported"}</span>
        </div>
      </div>
    </div>
  )
}

export default MediaObject