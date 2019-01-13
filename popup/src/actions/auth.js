export const getTokenFromCookie = () => dispatch => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({
      url: 'https://spotify.com',
      name: 'wp_access_token'
    }, cookie => {
      if (cookie) {
        resolve(dispatch({
          type: 'AUTH_GET_TOKEN_SUCCESS',
          token: cookie.value
        }))
      }

      reject('Token cookie is not exist')
    })
  })
}
