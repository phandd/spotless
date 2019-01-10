import React from 'react'
import { switchMenu } from '../actions/menubar';
import { connect } from 'react-redux'
import MenuItem from '../components/MenuItem'

const mapStateToProps = (state, ownProps) => ({
  active: state.menubar.selectedMenubarItem === ownProps.item
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(switchMenu(ownProps.item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem)