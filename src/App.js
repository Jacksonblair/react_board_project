import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions.js'
import './App.css'
import {
  HashRouter as Router,
} from "react-router-dom";

import Header from './containers/Header/Header.js'
import Body from './containers/Body/Body.js'
import Footer from './containers/Footer/Footer.js'
import Sidebar from './containers/Sidebar/Sidebar.js'

class App extends Component {

	state = {
		showingMenu: false
	}

	clickedMenuHandler = () => {
		this.setState({
			showingMenu: !this.state.showingMenu
		}, () => {
			console.log(this.state.showingMenu)
		})
	}

	componentDidMount = () => {

		/*
			On mount, check if we have a cookie stored with authentication details
			

		*/

		/* TODO: REAL API CALL */
		/*
		Fake API call to backend for user boards 
		We need to do this app.js, because the boards needs to..
		..be available in multiple containers in the app

		After this initial GET, we also set whether or not the user is authed
		*/

		this.props.updateBoards([
			{
				id: 0,
				name: "Board name 1asdasd",
			},
			{
				id: 1,
				name: "Board name 2asdasdasdsad",
			},
			{
				id: 2,
				name: "Board name 3asdasdasdsadasdasd",
			}
		])

	}

	render() {
		return (
			<Router>
				<div className="app">
					<Header clickedMenu={this.clickedMenuHandler}/>
					<Body/>
					<Footer/>
					<Sidebar showingMenu={this.state.showingMenu}/>
				</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateBoards: (boards) => dispatch({ type: actionTypes.BOARDS_UPDATE, payload: { boards: boards }}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)