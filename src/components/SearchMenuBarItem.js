import React, { Component } from 'react'

const SearchMenuBarItem = ({ active, onClick, children }) => {
  return(
    <div onClick={onClick} className={`search-menu-bar-item ${active ? 'selected' : ''}`}>
      {children}
    </div>
  )
}

export default SearchMenuBarItem