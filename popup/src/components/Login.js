import React from 'react'

const Login = () => {
  function onLogin() {
    chrome.tabs.create({
      url: "https://accounts.spotify.com/login?continue=https%3A%2F%2Fopen.spotify.com",
      active: true,
    })
  }

  return(
    <div className="login">
      <span>Looks like you're not logged in</span>
      <button onClick={onLogin}>Log in</button>
      <div className="login-helper">
        <span>Tip: Use Spotify Web player to mute ads</span>
      </div>
    </div>
  )
}

export default Login