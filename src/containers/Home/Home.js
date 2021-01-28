import React, { Component } from 'react'
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

		this.getHome()
	}

	componentDidUpdate = (prevProps) => {

	}

	getHome = () => {
		axios.get("/home")
		.then((res) => {

			/* Add boards received from server to store */
			this.props.updateBoards(res.data)
			this.setState({
				finishedLoading: true
			})
		})
		.catch((err) => {
			this.setState({
				readError: "Something has gone wrong! :( Try again later."
			})
		})
	}

	clearCreatorErrors = () => {
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitNewBoard = (name, description, isPublic) => {
		this.setState({
			processing: true
		})
		axios.post('/board/new', {
			name, description, public: isPublic
		})
		.then((res) => {
			this.setState({
				processing: false,
				finishedLoading: false
			})
			this.props.history.push('/')
		})
		.catch((err) => {	
			console.log(err)
		})

	}

	render() {

 		let boards = this.props.boards.map((board, i) => {
			return (
				<HomeBoard board={board} key={`HomeBoard${i}`}/>
			)
		})

		let boardButton = boards.length ? 
		(
			<Link to="/home/new" className='new'>
				Add New Board&nbsp;<i className="fas fa-plus-circle"></i>
			</Link>
		) : (
			<Link to="/home/new" className='new first'>
				Create your first board!&nbsp;<i className="fas fa-plus-circle"></i>
			</Link>
		)

		return (
			<div className="container-home">
				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
					<Switch>
						<Route exact path="/home/new">
							<div className="body-sub-menu">
								<button onClick={this.props.history.goBack}> Back </button>
							</div>
							<BoardCreator
							clearErrors={this.clearCreatorErrors}
							clickedSubmit={this.clickedSubmitNewBoard}
							formError={this.state.formError}
							serverError={this.state.serverError}
							processing={this.state.processing}/>
						</Route>
						<Route exact path="/home">
							<div className="home">
								<div className="boards">
									<div className="header"> Your Boards </div>
									{boards}
									{boardButton}
								</div>
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
		pageVariants: state.pageVariants,
		userDetails: state.userDetails,
		boards: state.boards
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateBoards: (boards) => {
			dispatch({ type: actionTypes.BOARDS_UPDATE, payload: { boards: boards } })
		}, 
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))