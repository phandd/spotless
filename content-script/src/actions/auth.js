import { AUTH as actionTypes } from '../constants/actionTypes'
import axios from 'axios'

export const getTokenFromCookie = () => dispatch => {
  return axios({
    url: "https://open.spotify.com/get_access_token?reason=transport&productType=web_player",
  })
  .then(res => {
    if (res.data.accessToken) {
      return dispatch({
        type: actionTypes.GET_TOKEN_SUCCESS,
        token: res.data.accessToken,
      })
    }

    throw new Error("Token cookie is not exist");
  })
}
