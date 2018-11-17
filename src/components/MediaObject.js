import React from 'react'

const MediaObject = () => {
  return(
    <div className='media-object'>
      <div className='cover-art' style={{"backgroundImage" : `url(https://i.scdn.co/image/c1a53135d587eb013f86a8228db067936364d779)`}} />
      <div className='media-info'>
        <div className='info-name'>
          <span>Let you love me</span>
        </div>
        <div className='info-meta'>
        <span>Rita Ora</span>
        </div>
      </div>
    </div>
  )
}

export default MediaObject