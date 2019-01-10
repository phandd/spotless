import { MENU_BAR as actionTypes } from '../constants/actionTypes'
import { MENUBAR_ITEMS } from '../constants/menubar'

const defaultState = {
  selectedMenubarItem: MENUBAR_ITEMS.PLAYER
}

export default (state = defaultState, action) => {
  if (action.type === actionTypes.SWITCH_MENU) {
    return { ...state, selectedMenubarItem: action.item }
  }

  return state
}
