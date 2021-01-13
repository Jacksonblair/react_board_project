import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Post.css'
import {
	withRouter
} from "react-router-dom";

class Post extends Component {

	state = {

	}

	state = {
		finishedLoading: true,
		readError: ""
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
					<div className="title"> {this.props.currentPost.title} </div>
					<div className="metadata"> 
						<div className="author">
							Author:&nbsp;<div className="name">Jimmy Neutron</div>
						</div>
						<div className="created">
							Created:&nbsp;<div className="date"> 00/00/0000 </div>
						</div>
					</div>
					<div className="content"> {this.props.currentPost.content} </div>
				</React.Fragment>
			)
		}

		return (
			<div className="container-post">
				{content}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentPost: state.currentPost
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCurrentPost: (post) => dispatch({ type: actionTypes.CURRENT_POST_UPDATE, payload: { post }}),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))