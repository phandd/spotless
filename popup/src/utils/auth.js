export const renewSpotifyToken = () => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.open("GET", "https://open.spotify.com/", true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        resolve()
      }
    }

    xhr.send();
  })
}
