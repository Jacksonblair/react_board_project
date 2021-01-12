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
import CSSTransition from '../Util/CSSTransition/CSSTransition'

import Board from '../Board/Board.js'

class Body extends Component {

	state = {
		hasInit: false
	}

	bodyNavEnum = {
		HOME: 0,
		BOARD: 1,
		POST: 2,
		PROFILE: 3
	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {

	}

	getInterface = (index) => {
		switch(index) {
			case 0:
				return 0
				break;
			case 1:
				return <Board/>
				break;
			case 2:
				return 2
				break;
		}
	}

	render() {

		return (
			<div className="container-body">
				<div className="column">
					<Switch>
						<Route path="/home">
							{this.getInterface(this.bodyNavEnum.HOME)}
						</Route>
						<Route path="/board/:boardid">
							{this.getInterface(this.bodyNavEnum.BOARD)}
						</Route>
						<Route exact path="/profile/:userid">
							{this.getInterface(this.bodyNavEnum.PROFILE)}
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