import React from 'react'

const NoDevice = () => {
  function onOpenPlayer() {
    chrome.tabs.create({
      url: "https://open.spotify.com",
      active: true,
    })
  }

  return(
    <div className="no-device">
      <span>No Device Found !</span>
      <span className="no-device-helper">This version support only Web and Desktop players</span>
      <span className="no-device-helper" style={{fontWeight: 800}}>Open Web player to mute ads</span>
      <button onClick={onOpenPlayer}>Open web player</button>
    </div>
  )
}

export default NoDevice