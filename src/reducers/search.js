import { SEARCH_TYPES } from '../constants/search';
import { SEARCH as actionTypes } from '../constants/actionTypes'

const defaultState = {
  selectedSeachMenuBarItem: SEARCH_TYPES.TRACKS,
  lastSearch: null,
  lastResult: null
}

export default (state = defaultState, action) => {
  if (action.type === actionTypes.SWITCH_SEARCH_MENU) {
    return {
      ...state,
      selectedSeachMenuBarItem: action.item
    }
  }

  if (action.type === actionTypes.SEARCH_REQUEST) {
    return {
      ...state,
      lastSearch: action.keyword
    }
  }

  if (action.type === actionTypes.SEARCH_SUCCESS) {
    return {
      ...state,
      lastResult: action.response
    }
  }

  return state
}