import { AUTH as actionTypes } from '../constants/actionTypes'
import { callApiThunk } from '../utils/api'

export const getTokenFromCookie = () => dispatch => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({
      url: 'https://spotify.com',
      name: 'wp_access_token'
    }, cookie => {
      if (cookie) {
        resolve(dispatch({
          type: actionTypes.GET_TOKEN_SUCCESS,
          token: cookie.value
        }))
      }

      reject('Token cookie is not exist')
    })
  })
}

export const authenticate = () => dispatch => {
  dispatch(callApiThunk({
    method: 'GET',
    endpoint: '/me',
    types: [actionTypes.LOG_IN_REQUEST, actionTypes.LOG_IN_SUCCESS, actionTypes.LOG_IN_FAILURE]
  }))
}