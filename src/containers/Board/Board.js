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
import { AnimatePresence, motion } from "framer-motion"

import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'
import BoardMenu from '../../components/Body/Board/BoardMenu/BoardMenu.js'
import BoardEditor from '../../components/Body/Board/BoardEditor/BoardEditor.js'
import BoardListViewer from '../../components/Body/Board/BoardListViewer/BoardListViewer.js'
import BoardCalendarViewer from '../../components/Body/Board/BoardCalendarViewer/BoardCalendarViewer.js'
import Post from '../Post/Post.js'
import PostCreator from '../../components/Body/Board/PostCreator/PostCreator'

class Board extends Component {

	state = {
		finishedLoading: false,
		readError: "",

		/* Variables for <BoardEditor> */
		serverError: "",
		formError: "",
		processing: false,
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
			setTimeout(() => {
				this.setState({
					finishedLoading: true
				})
			}, 500)
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



	clickedSubmitEditedBoardHandler = (name, description) => {
		// TODO: Send to server
		console.log(name, description)
		this.setState({
			processing: true
		})

		setTimeout(() => {

			this.setState({
				formError: "fart noise",
				processing: false
			})

		}, 1000)
	}

	clearErrors = () => {
		console.log("Clearing form errors")
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitNewPostHandler = (title, content) => {
		console.log(title, content)
	}



	render() {
		return (
			<div className="container-board">

				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
				
						<React.Fragment>
							<AnimatePresence location={this.props.location} key={this.props.location.pathname}>
								<Switch>	
									<Route exact path="/board/:boardid/edit">
										<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
											<BoardEditor
											clearErrors={this.clearErrors}
											clickedSubmit={this.clickedSubmitEditedBoardHandler}
											serverError={this.state.serverError}
											formError={this.state.formError}
											processing={this.state.processing}
											userDetails={this.props.userDetails}
											currentBoard={this.props.currentBoard}/>
										</motion.div>
									</Route>
									<Route exact path="/board/:boardid/list">
										<React.Fragment>
											<BoardMenu 
											clickedCalendarViewer={this.clickedCalendarViewerHandler}
											clickedListViewer={this.clickedListViewerHandler}
											currentBoard={this.props.currentBoard}/>
											<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
												<BoardListViewer currentBoard={this.props.currentBoard}/>
											</motion.div>
										</React.Fragment>
									</Route>
									<Route exact path="/board/:boardid/calendar">
										<React.Fragment>
											<BoardMenu 
											clickedCalendarViewer={this.clickedCalendarViewerHandler}
											clickedListViewer={this.clickedListViewerHandler}
											currentBoard={this.props.currentBoard}/>
											<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
												<BoardCalendarViewer 
													updateCalendarMonth={this.updateCalendarMonthHandler}
													updateCalendarYear={this.updateCalendarYearHandler}
													updateCalendarUnit={this.updateCalendarUnitHandler}
													pageVariants={this.props.pageVariants}
													calendar={this.props.calendar}
													currentBoard={this.props.currentBoard}/>
											</motion.div>
										</React.Fragment>
									</Route>
									<Route exact path="/board/:boardid/post/new">
										<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
											<PostCreator
											clearErrors={this.clearErrors}
											clickedSubmit={this.clickedSubmitNewPostHandler}
											serverError={this.state.serverError}
											formError={this.state.formError}
											processing={this.state.processing}/>
										</motion.div>
									</Route>
									<Route path="/board/:boardid/post/:postid">
										<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
											<Post/>
										</motion.div>
									</Route>
									<Route>
										<Redirect to={`/board/${this.props.match.params.boardid}/list`}/>
									</Route>
								</Switch>
							</AnimatePresence>
						</React.Fragment>

				</ResourceWrapper>

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
		userDetails: state.userDetails
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