import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions.js'
import './PostViewer.css'
import {
	Link,
	withRouter
} from "react-router-dom";

class PostViewer extends Component {

	/*
		NOTE: 
		If we load into this directly, we need to get the post to view
		.. from the store using the :postid parameter in the url
	*/

	state = {
		finishedLoading: false,
		post: null
	}

	componentDidMount = () => {
		if (!this.props.postToView.id) {
			console.log("NO EXISTING POST")

			let post = this.props.posts.filter((post) => {
				return post.id == this.props.match.params.postid
			})[0]

			this.props.updatePostToView(post)

			this.setState({
				finishedLoading: true
			})
		} else {
			this.setState({
				finishedLoading: true
			})
		}
	}

	render() {
		let postContent = this.state.finishedLoading ? 
				<React.Fragment>
					<Link to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/edit`}> 
						<button>
							EDIT POST
						</button>
					</Link>
					<div className="post-viewer-post-title">
						{this.props.postToView.title}
					</div>
					<div className="post-viewer-post-date">
						{this.props.postToView.date}
					</div>
					<div className="post-viewer-post-content">
						{this.props.postToView.content}
					</div>
				</React.Fragment>
				: <div> LOADING </div>
		return (
			<div className="container-post-viewer">
				{postContent}
			</div>
		)			
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.posts,
		postToView: state.postToView
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updatePostToView: (post) => dispatch({ type: actionTypes.POST_TO_VIEW_UPDATE, payload: { post: post }}),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostViewer))
