import React, { Component } from 'react'
import { getLoginStatus } from '../selectors/auth'
import { authenticate } from '../actions/auth'
import { MENUBAR_ITEMS } from '../constants/menubar'
import PlayerContainer from './PlayerContainer'
import SearchContainer from './SearchContainer'
import Login from '../components/Login'
import { connect } from 'react-redux'

class ContentContainer extends Component {
  componentDidMount() {
    this.props.authenticate()
  }

  render() {
    const { loginState, selectedMenubarItem } = this.props

    if (!loginState) {
      return (
        <div className="content">
          <Login />
        </div>
      )
    }
  
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
      <div className="content">
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMenubarItem: state.menubar.selectedMenubarItem,
    loginState: getLoginStatus(state)
  }
}

export default connect(
  mapStateToProps, {
    authenticate
  }
)(ContentContainer)
