export default (state = { token: null }, action) => {
  if (action.type === 'AUTH_GET_TOKEN_SUCCESS') {
    return {
      ...state,
      token: action.token
    }
  }

  return state;
}