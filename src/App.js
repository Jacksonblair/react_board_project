import React, { Component } from 'react'
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

export default App