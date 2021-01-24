import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Post.css'
import {
	Link,
	withRouter,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'
import PostEditor from '../../components/Body/Post/PostEditor/PostEditor.js'
import PostDeleter from '../../components/Body/Post/PostDeleter/PostDeleter.js'

class Post extends Component {

	months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

	state = {
		finishedLoading: false,
		readError: "",

		/* Variables for <PostEditor> */
		serverError: "",
		formError: "",
		processing: false,
	}

	componentDidMount = () => {
		/* 
		On component mount, we check the store for a post with an id that matches the url
		If it's not there, we try to get the post from the server
		We don't need to check in the board id because its checked in the <Board> component
		.. before this component is allowed to load.
		*/
		this.getPost()
	}

	componentDidUpdate = (prevProps) => {
		/*
			On component update, we check if the :boardid in the url has changed.
			If it has, we need to call getPost again			
		*/
		if (prevProps.match.params.postid != this.props.match.params.postid) {
			this.setState({
				finishedLoading: false
			})
			this.getPost()
		}
	}

	getPost = (callback) => {
		this.setState({
			finishedLoading: false
		})

		axios.get(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)
		.then((res) => {
			this.props.updateCurrentPost(res.data.post)
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


	clickedSubmitEditedPostHandler = (event, title, content) => {
		event.preventDefault()
		this.setState({
			processing: true
		})

		// TODO: Pass post through client side validation

		axios.put(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/`, {
			title, content, target_date: this.props.postTargetDate
		})
		.then((res) => {
			this.props.history.push(`/board/${this.props.match.params.boardid}`)
		})
		.catch((err) => {
			this.setState({
				serverError: err.response ? err.response.data : "Error",
				processing: false				
			})
		})

	}

	clickedPostDateHandler = () => {
		this.props.updateDateRangeType(4)
		this.props.history.push(`/board/${this.props.match.params.boardid}/calendar`)
	}

	clearFormErrors = () => {
		console.log("Clearing form errors")
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedConfirmDeleteHandler = () => {
		this.setState({
			processing: true
		})

		axios.delete(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)
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

	render() {

		let mm, dd, yyyy
		if (this.props.currentPost.target_date) {
			[ dd, mm, yyyy ] = this.props.currentPost.target_date.split('/')
		}

		return (
			<div className="container-post">
				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
					<Switch>
						<Route exact path="/board/:boardid/post/:postid/edit">
							<div className="body-sub-menu" key="bodySubMenu">
								<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)}> Back </button>
							</div>
							<PostEditor
							clickedPostDate={this.clickedPostDateHandler}
							clickedSubmit={this.clickedSubmitEditedPostHandler}
							clearErrors={this.clearFormErrors}
							userDetails={this.props.userDetails}
							currentPost={this.props.currentPost}
							postTargetDate={this.props.postTargetDate}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}/>
						</Route>
						<Route exact path="/board/:boardid/post/:postid/delete">
							<div className="body-sub-menu" key="bodySubMenu">
								<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)}> Back </button>
							</div>
							<PostDeleter
							userDetails={this.props.userDetails}
							processing={this.state.processing}
							serverError={this.state.serverError}
							clickedConfirm={this.clickedConfirmDeleteHandler}
							currentPost={this.props.currentPost}/>
						</Route>
						<Route exact path="/board/:boardid/post/:postid/">
							<div className="body-sub-menu" key="bodySubMenu">
								<button onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/`)}> Back </button>
							</div>
							<div className="board-sub-menu">
								<Link className="edit" to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/edit`}> <i className="fas fa-edit"></i> </Link>
							</div>
							<div className="header">
								<div className="date-column"> 
									<div className="box">
										<div className="day">
											{dd}
										</div>
										<div className="month">
											{this.months[mm - 1] ? this.months[mm - 1].substr(0, 3).toUpperCase() : null}
										</div>
										<div className="year">
											{yyyy}
										</div>
									</div>
								</div>
								<div className="title-column"> 
									<div className="title"> {this.props.currentPost.title} </div>
									<div className="metadata"> 
										<div className="author">
											Author:&nbsp;<div className="name">Jimmy Neutron</div>
										</div>
										<div className="created">
											Created:&nbsp;<div className="date"> {this.props.currentPost.created_date} </div>
										</div>
									</div>
								</div>
							</div>
							<div className="content"> {this.props.currentPost.content} </div>
						</Route>
						<Route> 
							<Redirect to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`}/>
						</Route>
					</Switch>

				</ResourceWrapper>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentPost: state.currentPost,
		userDetails: state.userDetails,
		postTargetDate: state.postTargetDate
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCurrentPost: (post) => dispatch({ type: actionTypes.CURRENT_POST_UPDATE, payload: { post }}),
		updateDateRangeType: (type) => dispatch({ type: actionTypes.DATE_RANGE_TYPE_UPDATE, payload: { type } }), 
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))