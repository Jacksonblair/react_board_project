import React, { Component } from 'React'
import './Board.css'
import { connect } from 'react-redux'
import axios from 'axios'
import {
	Switch,
	Route,
	Redirect,
	withRouter
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'

import BoardMenu from '../../components/Body/Board/BoardMenu/BoardMenu.js'
import BoardListViewer from '../../components/Body/Board/BoardListViewer/BoardListViewer.js'
import BoardCalendarViewer from '../../components/Body/Board/BoardCalendarViewer/BoardCalendarViewer.js'
import Post from '../Post/Post.js'

class Board extends Component {

	state = {
		finishedLoading: true,
		readError: ""
	}

	componentDidMount = () => {
		/* 
		On component mount, we check the store for a board with an id that matches the url
		If it's not there, we try to get the board from the server
		*/

		if (this.props.currentBoard.id != this.props.match.params.boardid) {
			// Need to get the board from server
			this.getBoard(() => {
				this.setState({
					finishedLoading: true
				})
			})
		} else {
			// We already the correct board props.currentBoard
			this.setState({
				finishedLoading: true
			})
		}
	}

	getBoard = (callback) => {
		axios.get(`/board/${this.props.match.params.boardid}`)
		.then((res) => {
			callback ? callback() : null
		})
		.catch((err) => {

		})
	}

	render() {

		let content
		if (this.state.readError) {
			content = (
				<div className="read-error"> {this.state.readError} <i class="fas fa-exclamation"></i> </div>
			)
		} else if (!this.state.finishedLoading) {
			content = (
				<div className="loading-message"> <i className="fas fa-asterisk"></i> </div>
			)
		} else {
			content = (
				<React.Fragment>
					<BoardMenu currentBoard={this.props.currentBoard}/>
					<Switch>	
						<Route exact path={`/board/${this.props.match.params.boardid}/list`}>
							<BoardListViewer/>
						</Route>
						<Route exact path={`/board/${this.props.match.params.boardid}/calendar`}>
							<BoardCalendarViewer/>
						</Route>
						<Route exact path={`/board/${this.props.match.params.boardid}/post/:postid`}>
							<Post/>
						</Route>
						<Route>
							<Redirect to={`/board/${this.props.match.params.boardid}/list`}/>
						</Route>
					</Switch>
				</React.Fragment>
			)
		}

		return (
			<div className="container-board">
				{content}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentBoard: state.currentBoard
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))