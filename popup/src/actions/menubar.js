import { MENU_BAR as actionTypes } from '../constants/actionTypes'

export const switchMenu = (item) => {
  return {
    type: actionTypes.SWITCH_MENU,
    item
  }
}
