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

	months = ["JAN", "FEB", "MAR", "APR", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

	componentDidMount = () => {
		if (!this.props.postToView.id) {

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

		let dd, mm, yyyy
		if (this.props.postToView.date) {
			[ dd, mm, yyyy ] = this.props.postToView.date.split('/')
		}

		let postContent = this.state.finishedLoading ? 
				<React.Fragment>
					<div className="board-sub-menu bg-1">
						<Link to={`/board/${this.props.match.params.boardid}`}> 
							<div className="board-sub-menu-button color-2">
								<i className="fas fa-arrow-left"/>&nbsp;Back
							</div>
						</Link>
						<Link to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}/edit`}> 
							<div className="board-sub-menu-button color-2">
								Edit Post&nbsp;<i className="fas fa-edit"/>
							</div>
						</Link>
						<div className="board-sub-menu-button delete-post color-2">
							Delete Post&nbsp;<i className="fas fa-times"/>
						</div>
					</div>

					<div className="post-viewer-post">

						<div className="post-viewer-post-header">
							<div className="post-viewer-post-date-container bg-5">
								<div className="post-viewer-post-date-day color-1">
								 	{dd}
								</div> 
								<div className="post-viewer-post-date-month color-1">
								 	{this.months[parseInt(mm) - 1]}
								</div> 
							</div>

							<div className="post-viewer-post-title-container">
								<div className="post-viewer-post-title">
									{this.props.postToView.title}
								</div>
								<div className="post-viewer-post-author color-2">
									Posted by:&nbsp;
									<div className="color-5">
										Dave
									</div>
								</div>
							</div>
						</div>

						<div className="post-viewer-post-content">
							{this.props.postToView.content}
						</div>
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
