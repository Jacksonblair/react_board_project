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
import FuzzySearch from 'fuzzy-search'

import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'
import BoardMenu from '../../components/Body/Board/BoardMenu/BoardMenu.js'
import BoardEditor from '../../components/Body/Board/BoardEditor/BoardEditor.js'
import BoardDeleter from '../../components/Body/Board/BoardDeleter/BoardDeleter.js'
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

		/* Filter variables */
		searchTerm: "",
	}

	componentDidMount = () => {
		/* 
			On component mount, we check the store for a board with an id that matches the url
			If it's not there, we try to get the board from the server
		*/
		this.getBoard()
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
			this.getBoard()
		}
	}

	getBoard = (callback) => {
		axios.get(`/board/${this.props.match.params.boardid}`)
		.then((res) => {
			this.props.updateCurrentBoard(res.data.board)
			this.props.updateCurrentBoardPosts(res.data.posts)
			this.setState({
				finishedLoading: true
			})
		})
		.catch((err) => {
			this.setState({
				readError: err.response ? err.response.data : "Error"
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

	clickedSubmitEditedBoardHandler = (event, name, description, isPublic) => {
		event.preventDefault()		
		this.setState({
			processing: true
		})

		// TODO: Pass board through client side validation

		axios.put(`/board/${this.props.match.params.boardid}/`, {
			name, description, public: isPublic
		})
		.then((res) => {
			console.log(res)
			this.props.history.push(`/home`)
		})
		.catch((err) => {
			this.setState({
				serverError: err.response ? err.response.data : "Error",
				processing: false
			})
		})
	}

	clearFormErrors = () => {
		console.log("Clearing form errors")
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitNewPostHandler = (event, title, content) => {
		event.preventDefault()

		// TODO: Pass post through client side validation

		axios.post(this.props.location.pathname, {
			title, content, target_date: this.props.postTargetDate
		})
		.then((res) => {
			this.props.history.push(`/board/${this.props.match.params.boardid}/`)
		})
		.catch((err) => {
			this.setState({
				serverError: err.response ? err.response.data : "Error",
				processing: false				
			})
		})
	}

	updateSearchTermHandler = (searchTerm) => {
		this.setState({
			searchTerm
		})
	}

	clickedUpdateDateRangeTypeHandler = (dateRangeType) => {
		/* 
			We get a type of range to set here, then swap to calendar view
			.. Then when the user clicks a date in the calendar viewer
			.. That becomes the date for that range type
			( User clicks set 'Start' date, clicks 11th of Jan > Everything is filtered from on/after 11th Jan )
			* We also use this for setting dates for editing/creating posts

			0: particular day
			1: start date
			2: end date
			3: new post target date
			4: updated post target date

		*/
		this.props.updateDateRangeType(dateRangeType)
		this.props.history.push(`/board/${this.props.match.params.boardid}/calendar`)
	}

	clickedClearDateRangeHandler = () => {
		this.props.updateDateRangeStart(null)
		this.props.updateDateRangeEnd(null)
	}

	clickedCalendarDayHandler = (day) => {
		let date = new Date(this.props.calendar.year, this.props.calendar.month, day)

		switch (this.props.dateRangeType) {
			case 0: // Picking a particular day
				this.props.updateDateRangeStart(new Date(date.getTime() - (24 * 60 * 60 * 1000)))
				this.props.updateDateRangeEnd(new Date(date.getTime() + (24 * 60 * 60 * 1000)))
				this.props.updateDateRangeType(0)
				this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
			break;
			case 1: // Picking start date
				this.props.updateDateRangeStart(date)
				this.props.updateDateRangeType(0)
				this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
			break;
			case 2: // Picking end date
				this.props.updateDateRangeEnd(date)
				this.props.updateDateRangeType(0)
				this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
			break;
			case 3: // New post target date
				this.props.updatePostTargetDate(date)
				this.props.updateDateRangeType(0)
				this.props.history.push(`/board/${this.props.match.params.boardid}/post/new`)
			break;
			case 4: // Updating post target date 
				this.props.updatePostTargetDate(date)
				this.props.updateDateRangeType(0)
				this.props.history.push(`/board/${this.props.match.params.boardid}/post/${this.props.currentPost.id}/edit`)
			break;
		}


	}

	/* We pass the contents of currentBoard through this filter each render */
	getFilteredPosts = () => {
		let filteredPosts = []

		/* Posts need to pass the date filter */
		this.props.currentBoardPosts.forEach((post, i) => {
			let canShow = true // Flag for post passing filter

			let [ dd, mm, yyyy ] = post.target_date.split('/') 
			let postDate = new Date(parseInt(yyyy), parseInt(mm - 1), parseInt(dd))

			if (this.props.dateRangeStart) {
				// If post date pre-dates our range start date
				if (postDate <= this.props.dateRangeStart)
					canShow = false 
			}

			if (this.props.dateRangeEnd) {
				// If post date post-dates our range end date
				if (postDate >= this.props.dateRangeEnd)
					canShow = false
			}

			if (canShow) {
				filteredPosts.push(post)
			}
		})

		/* And the fuzzysearch filter */
		const searcher = new FuzzySearch(filteredPosts, ['title', 'content'], {
	  		caseSensitive: false,
		});

		filteredPosts = searcher.search(this.state.searchTerm);

		return filteredPosts;
	}

	clickedConfirmDeleteHandler = () => {
		this.setState({
			processing: true
		})
		axios.delete(`/board/${this.props.match.params.boardid}/`)
		.then((res) => {
			this.props.history.push('/home/')
		})
		.catch((err) => {
			this.setState({
				serverError: err.response ? err.response.data : "Error",
				processing: false
			})
		})
	}

	render() {

		let filteredPosts = this.getFilteredPosts()

		return (
			<div className="container-board">

				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
				
						<React.Fragment>
								<Switch>	
									<Route exact path="/board/:boardid/edit">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}`)}> Back </button>
										</div>
										<BoardEditor
										clearErrors={this.clearFormErrors}
										clickedSubmit={this.clickedSubmitEditedBoardHandler}
										serverError={this.state.serverError}
										formError={this.state.formError}
										processing={this.state.processing}
										userDetails={this.props.userDetails}
										currentBoard={this.props.currentBoard}/>
									</Route>
									<Route exact path="/board/:boardid/delete">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/edit`)}> Back </button>
										</div>
										<BoardDeleter
										clearErrors={this.clearFormErrors}
										clickedConfirm={this.clickedConfirmDeleteHandler}
										serverError={this.state.serverError}
										formError={this.state.formError}
										processing={this.state.processing}
										userDetails={this.props.userDetails}
										currentBoard={this.props.currentBoard}/>
									</Route>
									<Route exact path="/board/:boardid/list">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/`)}> Back </button>
										</div>
										<BoardMenu 
										dateRangeStart={this.props.dateRangeStart}
										dateRangeEnd={this.props.dateRangeEnd}
										clickedClearDateRange={this.clickedClearDateRangeHandler}
										clickedUpdateDateRangeType={this.clickedUpdateDateRangeTypeHandler}
										updateSearchTerm={this.updateSearchTermHandler}
										clickedCalendarViewer={this.clickedCalendarViewerHandler}
										clickedListViewer={this.clickedListViewerHandler}
										currentBoard={this.props.currentBoard}/>
										<BoardListViewer 
										currentBoard={this.props.currentBoard}
										posts={filteredPosts}/>
									</Route>
									<Route exact path="/board/:boardid/calendar">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/`)}> Back </button>
										</div>
										<BoardMenu 
										updateSearchTerm={this.updateSearchTermHandler}
										clickedCalendarViewer={this.clickedCalendarViewerHandler}
										clickedListViewer={this.clickedListViewerHandler}
										currentBoard={this.props.currentBoard}/>
										<BoardCalendarViewer 
										clickedDay={this.clickedCalendarDayHandler}
										updateCalendarMonth={this.updateCalendarMonthHandler}
										updateCalendarYear={this.updateCalendarYearHandler}
										updateCalendarUnit={this.updateCalendarUnitHandler}
										pageVariants={this.props.pageVariants}
										calendar={this.props.calendar}
										currentBoard={this.props.currentBoard}
										posts={filteredPosts}/>
									</Route>
									<Route exact path="/board/:boardid/post/new">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}`)}> Back </button>
										</div>
										<PostCreator
										clickedUpdateDateRangeType={() => this.clickedUpdateDateRangeTypeHandler(3)}
										postTargetDate={this.props.postTargetDate}
										clearErrors={this.clearFormErrors}
										clickedSubmit={this.clickedSubmitNewPostHandler}
										serverError={this.state.serverError}
										formError={this.state.formError}
										processing={this.state.processing}/>
									</Route>
									<Route path="/board/:boardid/post/:postid">
										<Post getBoard={this.getBoard}/>
									</Route>
									<Route>
										<Redirect to={`/board/${this.props.match.params.boardid}/list`}/>
									</Route>
								</Switch>
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
		currentPost: state.currentPost,
		currentBoardPosts: state.currentBoardPosts,
		calendar: {
			unit: state.calendarUnit,
			year: state.calendarYear,
			month: state.calendarMonth
		},
		dateRangeType: state.dateRangeType,
		dateRangeStart: state.dateRangeStart,
		dateRangeEnd: state.dateRangeEnd,
		postTargetDate: state.postTargetDate,
		userDetails: state.userDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCalendarUnit: (unit) => dispatch({ type: actionTypes.CALENDAR_UNIT_UPDATE, payload: { unit } }), 
		updateCalendarMonth: (month) => dispatch({ type: actionTypes.CALENDAR_MONTH_UPDATE, payload: { month } }), 
		updateCalendarYear: (year) => dispatch({ type: actionTypes.CALENDAR_YEAR_UPDATE, payload: { year } }), 
		updateDateRangeType: (type) => dispatch({ type: actionTypes.DATE_RANGE_TYPE_UPDATE, payload: { type } }), 
		updateDateRangeStart: (date) => dispatch({ type: actionTypes.DATE_RANGE_START_UPDATE, payload: { date } }), 
		updateDateRangeEnd: (date) => dispatch({ type: actionTypes.DATE_RANGE_END_UPDATE, payload: { date } }), 
		updatePostTargetDate: (date) => dispatch({ type: actionTypes.POST_TARGET_DATE_UPDATE, payload: { date } }), 
		updateCurrentBoard: (board) => dispatch({ type: actionTypes.CURRENT_BOARD_UPDATE, payload: { board } }),
		updateCurrentBoardPosts: (posts) => dispatch({ type: actionTypes.CURRENT_BOARD_POSTS_UPDATE, payload: { posts } }),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))