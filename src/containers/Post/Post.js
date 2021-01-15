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

class Post extends Component {

	state = {

	}

	state = {
		finishedLoading: true,
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

		if (this.props.currentPost.id != this.props.match.params.postid) {
			this.getPost(() => {
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
		if (prevProps.match.params.postid != this.props.match.params.postid) {
			this.setState({
				finishedLoading: false
			})

			this.getPost(() => {
				this.setState({
					finishedLoading: true
				})
			})
		}
	}

	getPost = (callback) => {
		axios.get(`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`)
		.then((res) => {
			callback ? callback() : null
		})
		.catch((err) => {
			// TODO: fix later
			this.setState({
				readError: "Cannot view this post"
			})
		})
	}


	clickedSubmitEditedPostHandler = (title, content) => {

		console.log(title, content)

		// SUBMIT ZE POST
		this.setState({
			processing: true
		})

		setTimeout(() => {
			this.setState({
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

	render() {
		return (
			<div className="container-post">
				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
			
					<Switch>
						<Route exact path="/board/:boardid/post/:postid/edit">
							<PostEditor
							clickedSubmit={this.clickedSubmitEditedPostHandler}
							clearErrors={this.clearErrors}
							userDetails={this.props.userDetails}
							currentPost={this.props.currentPost}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}/>
						</Route>
						<Route exact path="/board/:boardid/post/:postid/">
							<div className="title"> {this.props.currentPost.title} </div>
							<div className="metadata"> 
								<div className="author">
									Author:&nbsp;<div className="name">Jimmy Neutron</div>
								</div>
								<div className="created">
									Created:&nbsp;<div className="date"> 00/00/0000 </div>
								</div>
							</div>
							<div className="board-sub-menu">
								<Link to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/edit`}> Edit Post </Link>
								<button> Delete Post </button>
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
		userDetails: state.userDetails
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCurrentPost: (post) => dispatch({ type: actionTypes.CURRENT_POST_UPDATE, payload: { post }}),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))