import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Home.css'
import {
	withRouter
} from "react-router-dom";

import HomeBoard from '../../components/Body/Home/HomeBoard/HomeBoard.js'
import HomeActivity from '../../components/Body/Home/HomeActivity/HomeActivity.js'

class Home extends Component {

	state = {

	}

	state = {
		finishedLoading: false,
		readError: ""
	}

	componentDidMount = () => {
		/*
			On mount, we check if there is a user
			.. if not, we redirect them to <Landing> 

			If there is, we try to get:
				- any boards they have access to
				- any activity for those boards

			.. from the server, and show it here.
		*/

		// TODO: Enable this later
/*		if (this.props.userDetails.id) {
			this.getHome(() => {
				this.setState({
					finishedLoading: true
				})
			})
		} else {
			this.props.history.push('/landing')
		}*/

		this.setState({
			finishedLoading: true
		})

	}

	componentDidUpdate = (prevProps) => {

	}

	getHome = (callback) => {
		axios.get("/home")
		.then((res) => {
			// TODO: Put home data in store
			callback ? callback() : null
		})
		.catch((err) => {
			// TODO: fix later
			this.setState({
				readError: "Cannot view this post"
			})
		})
	}

	render() {
		let content
		if (this.state.readError) {
			content = (
				<div className="read-error"> {this.state.readError} <i className="fas fa-exclamation"></i> </div>
			)
		} else if (!this.state.finishedLoading) {
			content = (
				<div className="loading-message"> <i className="fas fa-asterisk"></i> </div>
			)
		} else {

			let boards = this.props.boards.map((board, i) => {
				return (
					<HomeBoard board={board} key={`HomeBoard${i}`}/>
				)
			})

			content = (
				<React.Fragment>
					<div className="boards">
						{boards}
					</div>
					<div className="activity">
						<HomeActivity/>
					</div>
				</React.Fragment>
			)
		}

		return (
			<div className="container-home">
				{content}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userDetails: state.userDetails,
		boards: state.boards
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))