import { AUTH as actionTypes } from '../constants/actionTypes'
import { callApiThunk } from '../utils/api'

export const getTokenFromCookie = () => dispatch => {
  return new Promise((resolve, reject) => {
    const cookie = `; ${document.cookie}`
    const paths = cookie.split('; wp_access_token=')

    if (paths.length === 2) {
      return resolve(dispatch({
        type: actionTypes.GET_TOKEN_SUCCESS,
        token: paths.pop().split(';')[0]
      }))
    }

    reject('Token cookie is not exist')
  })
}
