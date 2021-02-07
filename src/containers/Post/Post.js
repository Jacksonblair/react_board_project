import React, { Component } from 'react'
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

		currentPost: {}
	}

	getPost = (callback) => {
		this.setState({
			finishedLoading: false,
			readError: ""
		})

		axios.get(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)
		.then((res) => {
			this.setState({
				currentPost: res.data.post,
				finishedLoading: true
			})
		})
		.catch((err) => {
			this.setState({
				readError: err.response ? err.response.data : "Error"
			})
		})
	}


	clickedSubmitEditedPostHandler = (event, title, content, targetDate) => {
		event.preventDefault()
		this.setState({
			processing: true,
			formError: "",
			serverError: ""
		})

		// TODO: Pass post through client side validation

		axios.put(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/`, {
			title, 
			content, 
			target_date: targetDate
		})
		.then((res) => {
			this.props.getBoard()
			this.props.history.push(`/board/${this.props.match.params.boardid}`)
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

	clickedConfirmDeleteHandler = () => {
		this.setState({
			processing: true
		})

		axios.delete(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)
		.then((res) => {
			this.props.getBoard()
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
		if (this.state.currentPost.target_date) {
			[ dd, mm, yyyy ] = this.state.currentPost.target_date.split('/')
		}

		return (
			<div className="container-post">
				<ResourceWrapper
				getResourceCondition="postid"
				getResource={this.getPost}
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
					<Switch>
						<Route exact path="/board/:boardid/post/:postid/edit">
							<div className="body-sub-menu" key="bodySubMenu">
								<button className="type-one" onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)}> Back </button>
							</div>
							<PostEditor
							currentPost={this.state.currentPost}
							clickedSubmit={this.clickedSubmitEditedPostHandler}
							clearErrors={this.clearFormErrors}
							userDetails={this.props.userDetails}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}/>
						</Route>
						<Route exact path="/board/:boardid/post/:postid/delete">
							<div className="body-sub-menu" key="bodySubMenu">
								<button className="type-one" onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)}> Back </button>
							</div>
							<PostDeleter
							userDetails={this.props.userDetails}
							processing={this.state.processing}
							serverError={this.state.serverError}
							clickedConfirm={this.clickedConfirmDeleteHandler}
							currentPost={this.state.currentPost}/>
						</Route>
						<Route exact path="/board/:boardid/post/:postid/">
							<div className="body-sub-menu" key="bodySubMenu">
								<button className="type-one" onClick={() => this.props.history.push(`/board/${this.props.match.params.boardid}/`)}> Back </button>
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
									<div className="title"> {this.state.currentPost.title} </div>
									<div className="metadata"> 
										<div className="created">
											Created:&nbsp;<div className="date"> {this.state.currentPost.created_date} </div>
										</div>
										{ this.props.userDetails.user_id == this.state.currentPost.created_by_user_id ?
											<Link to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/edit`}><i className="fas fa-pen"></i>&nbsp;Edit Post  </Link>
											: null
										}	
									</div>
								</div>
							</div>
							<div className="content"> {this.state.currentPost.content} </div>
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
		userDetails: state.userDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))