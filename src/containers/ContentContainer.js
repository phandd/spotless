import React from 'react'
import PropTypes from 'prop-types'
import { MENUBAR_ITEMS } from '../constants/menubar'
import PlayerContainer from './PlayerContainer'
import SearchContainer from './SearchContainer'
import { connect } from 'react-redux'

const ContentContainer = ({ selectedMenubarItem }) => {
  let content;

  switch (selectedMenubarItem) {
    case MENUBAR_ITEMS.PLAYER:
      content = <PlayerContainer /> // Menu component
      break
    // case MENUBAR_ITEMS.QUEUE:
    //   content = <div></div> // Menu component
    //   break
    case MENUBAR_ITEMS.SEARCH:
      content = <SearchContainer />
      break
    // case MENUBAR_ITEMS.LIBRARY:
    //   content = <div></div> // Menu component
    //   break
    default:
      content = <div></div> // Menu component
  }

  return(
    <div>
      {content}
    </div>
  )
}


const mapStateToProps = (state) => ({
  selectedMenubarItem: state.menubar.selectedMenubarItem
})

ContentContainer.propTypes = {
  selectedMenubarItem: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps
)(ContentContainer)
