import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Home.css'
import {
	withRouter,
	Link,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'

import HomeBoard from '../../components/Body/Home/HomeBoard/HomeBoard.js'
import HomeActivity from '../../components/Body/Home/HomeActivity/HomeActivity.js'
import BoardCreator from '../../components/Body/Home/BoardCreator/BoardCreator.js'

class Home extends Component {

	state = {
		finishedLoading: false,
		readError: "",

		/* Variables for <BoardCreator> */
		serverError: "",
		formError: "",
		processing: false,
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

	clearCreatorErrors = () => {
		console.log("Clearing creator errors")
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitNewBoard = (name, description) => {
		console.log(name, description)
	}


	render() {

		let boards = this.props.boards.map((board, i) => {
			return (
				<HomeBoard board={board} key={`HomeBoard${i}`}/>
			)
		})

		return (
			<div className="container-home">
				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>

					<Switch>
						<Route exact path="/home/new">
							<BoardCreator
							clearErrors={this.clearCreatorErrors}
							clickedSubmit={this.clickedSubmitNewBoard}
							formError={this.state.formError}
							serverError={this.state.serverError}
							processing={this.state.processing}/>
						</Route>
						<Route exact path="/home">
							<div className="boards">
								<Link to="/home/new" className="new">
									Add new Board
								</Link>
								{boards}
							</div>
							<div className="activity">
								<HomeActivity/>
							</div>	
						</Route>
						<Route>
							<Redirect to="/home"/>
						</Route>
					</Switch>

				</ResourceWrapper>
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