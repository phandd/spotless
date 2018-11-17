import React from 'react'
import PropTypes from 'prop-types'

const MenuItem = ({ active, onClick, children }) => {
  return(
    <div
      className={`menu-item ${active ? 'selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default MenuItem