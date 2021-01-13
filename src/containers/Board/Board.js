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
		finishedLoading: false,
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
				// TODO. Set board we get as currentBoard in store
				this.setState({
					finishedLoading: true
				})
			})
		} else {
			// We already have the correct board in props.currentBoard, show it
			this.setState({
				finishedLoading: true
			})
		}
	}

	componentDidUpdate = (prevProps) => {
		/*
			On component update, we check if the :boardid in the url has changed.
			If it has, we need to call getBoard again			
		*/
		if (prevProps.match.params.boardid != this.props.match.params.boardid) {
			this.setState({
				finishedLoading: false
			})

			this.getBoard(() => {
				this.setState({
					finishedLoading: true
				})
			})
		}
	}

	getBoard = (callback) => {
		axios.get(`/board/${this.props.match.params.boardid}`)
		.then((res) => {
			callback ? callback() : null
		})
		.catch((err) => {
			// TODO: fix later
			this.setState({
				readError: "Cannot view this board"
			})
		})
	}

	clickedCalendarViewerHandler = () => {
		console.log("wotm8")
		this.props.history.push(`/board/${this.props.match.params.boardid}/calendar`)
	}

	clickedListViewerHandler = () => {
		console.log("wotm9")
		this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
	}

	updateCalendarUnitHandler = (unit) => {
		this.props.updateCalendarUnit(unit)
	}

	updateCalendarMonthHandler = (month) => {
		this.props.updateCalendarMonth(month)
	}

	updateCalendarYearHandler = (month) => {
		this.props.updateCalendarYear(month)
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
			content = (
				<React.Fragment>
					<Switch>	
						<Route exact path="/board/:boardid/list">
							<React.Fragment>
								<BoardMenu 
								clickedCalendarViewer={this.clickedCalendarViewerHandler}
								clickedListViewer={this.clickedListViewerHandler}
								currentBoard={this.props.currentBoard}/>
								<BoardListViewer currentBoard={this.props.currentBoard}/>
							</React.Fragment>
						</Route>
						<Route exact path="/board/:boardid/calendar">
							<React.Fragment>
								<BoardMenu 
								clickedCalendarViewer={this.clickedCalendarViewerHandler}
								clickedListViewer={this.clickedListViewerHandler}
								currentBoard={this.props.currentBoard}/>
								<BoardCalendarViewer 
									updateCalendarMonth={this.updateCalendarMonthHandler}
									updateCalendarYear={this.updateCalendarYearHandler}
									updateCalendarUnit={this.updateCalendarUnitHandler}
									pageVariants={this.props.pageVariants}
									calendar={this.props.calendar}
									currentBoard={this.props.currentBoard}/>
							</React.Fragment>
						</Route>
						<Route exact path="/board/:boardid/post/:postid">
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
		pageVariants: state.pageVariants,
		currentBoard: state.currentBoard,
		calendar: {
			unit: state.calendarUnit,
			year: state.calendarYear,
			month: state.calendarMonth,
			day: state.calendarDay
		},
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCalendarUnit: (unit) => dispatch({ type: actionTypes.CALENDAR_UNIT_UPDATE, payload: { unit } }), 
		updateCalendarMonth: (month) => dispatch({ type: actionTypes.CALENDAR_MONTH_UPDATE, payload: { month } }), 
		updateCalendarYear: (year) => dispatch({ type: actionTypes.CALENDAR_YEAR_UPDATE, payload: { year } }), 
		updateCurrentBoard: (board) => dispatch({ type: actionTypes.CURRENT_BOARD_UPDATE, payload: { board } }),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))