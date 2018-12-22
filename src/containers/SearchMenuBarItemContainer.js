import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchMenuBarItem from '../components/SearchMenuBarItem'
import { switchSearchMenu } from '../actions/search'

const mapStateToProps = (state, ownProps) => ({
  active: state.search.selectedSeachMenuBarItem === ownProps.item
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(switchSearchMenu(ownProps.item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMenuBarItem)