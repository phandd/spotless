import React from 'react'
import MenuItemContainer from '../containers/MenuItemContainer'
import { MENUBAR_ITEMS } from '../constants/menubar'

const MenuBar = () => {
  return(
    <div className='menubar'>
      <MenuItemContainer item={MENUBAR_ITEMS.PLAYER}><div className='icon-player'/></MenuItemContainer>
      {/* <MenuItemContainer item={MENUBAR_ITEMS.QUEUE}><div className='icon-queue'/></MenuItemContainer> */}
      <MenuItemContainer item={MENUBAR_ITEMS.SEARCH}><div className='icon-search'/></MenuItemContainer>
      {/* <MenuItemContainer item={MENUBAR_ITEMS.LIBRARY}><div className='icon-library'/></MenuItemContainer> */}
    </div>
  )
}

export default MenuBar