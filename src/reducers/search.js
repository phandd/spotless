import { SEARCH_TYPES } from '../constants/search';
import { SEARCH as actionTypes } from '../constants/actionTypes'
import { union, merge } from 'lodash'

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

  if (action.type === actionTypes.SEARCH_LOAD_MORE_SUCCESS) {
    const resultType = Object.keys(action.response.result)[0]
    const mergedResult = {...action.response.result[resultType], items: union(state.lastResult.result[resultType].items, action.response.result[resultType].items)}
    const mergedEntities = {...state.lastResult.entities[resultType], ...action.response.entities[resultType]}

    return {
      ...state,
      lastResult: {
        ...state.lastResult,
        result: {
          ...state.lastResult.result, [resultType]: mergedResult
        },
        entities: {
          ...state.lastResult.entities, [resultType]: mergedEntities
        }
      }
    }
  }

  return state
}