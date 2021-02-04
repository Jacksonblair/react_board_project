import React, { Component } from 'react'
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

		/* Calendar Variables (Calendar Viewer & Dropdown In <BoardMenu>) */
		startDate: null,
		endDate: null
	}

	componentDidMount = () => {
		/* 
			On component mount, we check the store for a board with an id that matches the url
			If it's not there, we try to get the board from the server
		*/
		this.getBoard()

		console.log("Component mounted")
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
		this.props.history.push(`/board/${this.props.match.params.boardid}/calendar`)
	}

	clickedListViewerHandler = () => {
		this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
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
			this.props.history.push(`/board/${this.props.match.params.boardid}/`)
		})
		.catch((err) => {
			this.setState({
				serverError: err.response ? err.response.data : "Error",
				processing: false
			})
		})
	}

	clearFormErrors = () => {
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitNewPostHandler = (event, title, content, date) => {
		event.preventDefault()
		this.setState({
			processing: true
		})

		// Soome basic content validation
		if (title.length < 1) {
			this.setState({
				formError: "Please add a title to the post",
				processing: false
			})
		} else if (content.length < 1) {
			this.setState({
				formError: "Please add some content to the post",
				processing: false
			})
		} else {
			axios.post(this.props.location.pathname, {
				title, 
				content,
				target_date: date.toLocaleDateString("EN-au")
			})
			.then((res) => {
				this.getBoard()
				this.props.history.push(`/board/${this.props.match.params.boardid}/`)
				this.setState({
					processing: false
				})
			})
			.catch((err) => {
				this.setState({
					serverError: err.response ? err.response.data : "Error",
					processing: false
				})
			})
		}
	}

	updateSearchTermHandler = (searchTerm) => {
		this.setState({
			searchTerm
		})
	}

	clickedClearDateRangeHandler = () => {
		this.setState({
			startDate: null,
			endDate: null,
		})
	}

	clickedCalendarViewerDayHandler = (day, month, year) => {
		this.setState({
			startDate: new Date(year, month, day),
			endDate: new Date(year, month, day)
		})
		this.props.history.push(`/board/${this.props.match.params.boardid}/list`)
	}

	clickedLeftBoardMenuCalendarDayHandler = (day, month, year) => {
		let startDate = new Date(year, month, day)
		if (this.state.endDate && startDate > this.state.endDate) {
			this.setState({
				startDate,
				endDate: startDate
			})			
		} else {
			this.setState({
				startDate
			})
		}
	}

	clickedRightBoardMenuCalendarDayHandler = (day, month, year) => {
		let endDate = new Date(year, month, day)
		if (this.state.startDate && endDate < this.state.startDate) {
			this.setState({
				endDate,
				startDate: endDate
			})	
		} else {
			this.setState({
				endDate
			})
		}
	}

	clickedNewPostCalendarDayHandler = () => {

	}

	clickedEditedPostCalendarDayHandler = () => {

	}

	/* We pass the contents of currentBoard through this filter each render */
	getFilteredPosts = () => {
		let filteredPosts = []

		/* Posts need to pass the date filter */
		this.props.currentBoardPosts.forEach((post, i) => {
			let canShow = true // Flag for post passing filter

			let [ dd, mm, yyyy ] = post.target_date.split('/') 
			let postDate = new Date(parseInt(yyyy), parseInt(mm - 1), parseInt(dd))

			if (this.state.startDate) {
				// If post date pre-dates our range start date
				if (postDate < this.state.startDate)
					canShow = false 
			}

			if (this.state.endDate) {
				// If post date post-dates our range end date
				if (postDate > this.state.endDate)
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
										showCalendar={true}
										userDetails={this.props.userDetails}
										startDate={this.state.startDate}
										endDate={this.state.endDate}
										clickedLeftDay={this.clickedLeftBoardMenuCalendarDayHandler}
										clickedRightDay={this.clickedRightBoardMenuCalendarDayHandler}
										clickedClearDateRange={this.clickedClearDateRangeHandler}
										updateSearchTerm={this.updateSearchTermHandler}
										clickedCalendarViewer={this.clickedCalendarViewerHandler}
										currentBoard={this.props.currentBoard}/>
										<BoardListViewer 
										startDate={this.state.startDate}
										endDate={this.state.endDate}
										userDetails={this.props.userDetails}
										currentBoard={this.props.currentBoard}
										posts={filteredPosts}/>
									</Route>
									<Route exact path="/board/:boardid/calendar">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/`)}> Back </button>
										</div>
										<BoardMenu 
										userDetails={this.props.userDetails}
										updateSearchTerm={this.updateSearchTermHandler}
										clickedListViewer={this.clickedListViewerHandler}
										currentBoard={this.props.currentBoard}/>
										<BoardCalendarViewer 
										clickedDay={this.clickedCalendarViewerDayHandler}
										currentBoard={this.props.currentBoard}
										posts={filteredPosts}/>
									</Route>
									<Route exact path="/board/:boardid/post/new">
										<div className="body-sub-menu" key="bodySubMenu">
											<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}`)}> Back </button>
										</div>
										<PostCreator
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
		currentBoard: state.currentBoard,
		currentPost: state.currentPost,
		currentBoardPosts: state.currentBoardPosts,
		userDetails: state.userDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCurrentBoard: (board) => dispatch({ type: actionTypes.CURRENT_BOARD_UPDATE, payload: { board } }),
		updateCurrentBoardPosts: (posts) => dispatch({ type: actionTypes.CURRENT_BOARD_POSTS_UPDATE, payload: { posts } }),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))