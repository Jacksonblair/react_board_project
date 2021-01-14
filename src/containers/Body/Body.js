import React, { Component } from 'React'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'
import './Body.css'

import Board from '../Board/Board.js'
import Home from '../Home/Home.js'
import Auth from '../Auth/Auth.js'
import Profile from '../Profile/Profile.js'

class Body extends Component {

	state = {
		hasInit: false
	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {

	}

	render() {

		return (
			<div className="container-body">
				<div className="column">
					<Switch>
						<Route path="/home">
							<Home/>
						</Route>
						<Route path="/auth/">
							<Auth/>
						</Route>
						<Route path="/board/:boardid">
							<Board/>
						</Route>
						<Route path="/profile/:userid">
							<Profile/>
						</Route>
						<Route>
							<Redirect to="/home"/>
						</Route>
					</Switch>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)