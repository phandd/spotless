import { AUTH as actionTypes } from '../constants/actionTypes'

export default (state = { token: null, login: true }, action) => {
  if (action.type === actionTypes.GET_TOKEN_SUCCESS) {
    return {
      ...state,
      token: action.token
    }
  }

  if (action.type === actionTypes.LOG_IN_SUCCESS) {
    return {
      ...state,
      login: true
    }
  }

  if (action.type === actionTypes.LOG_OUT) {
    return {
      ...state,
      login: false,
      token: ""
    }
  }

  return state;
}