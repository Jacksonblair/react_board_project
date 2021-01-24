import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import './App.css'
import Header from './containers/Header/Header.js'
import Body from './containers/Body/Body.js'
import Footer from './containers/Footer/Footer.js'

class App extends Component {

	render() {
		return (
			<Router>
				<div className="app">
					<Switch>
						<Route path="/">
							<Header/>
							<Body/>
							<Footer/>
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App