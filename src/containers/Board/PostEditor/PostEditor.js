import React, { Component } from 'React'
import './PostEditor.css'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions.js'
import {
	Link,
	withRouter
} from "react-router-dom";

class PostEditor extends Component {

	state = {
		title: "",
		content: "",
		finishedLoading: false
	}

	componentDidMount = () => {
		/* On mount, get post from store. */
		if (!this.props.postToView.id) {

			let post = this.props.posts.filter((post) => {
				return post.id == this.props.match.params.postid
			})[0]

			this.props.updatePostToView(post)
		}
	}

	componentDidUpdate = () => {

		/* Once the post is available in store, get a copy locally to edit */
		if (!this.state.title && this.props.postToView) {
			this.setState({
				title: this.props.postToView.title,
				content: this.props.postToView.content,
				finishedLoading: true
			})
		}

	}

	clickedSubmitPostHandler = () => {
		console.log("SUBMITTING POST")

		/* TODO: AJAX to server */

	}

	titleChangedHandler = (updatedTitle) => {
		this.setState({
			title: updatedTitle
		})
	}

	contentChangedHandler = (updatedContent) => {
		this.setState({
			content: updatedContent
		})
	}

	render() {

		let postContent = this.state.finishedLoading ? 
			<React.Fragment>
				<div className="board-sub-menu bg-1">
					<Link to={`/board/${this.props.match.params.boardid}/post/${this.props.match.params.postid}`}> 
						<div className="board-sub-menu-button color-2">
							<i className="fas fa-arrow-left"/>&nbsp;Back
						</div>
					</Link>
				</div>

				<form className="board-form">
					<div className="board-form-title color-2">
						Edit post
					</div>
					<div className="board-form-menu">
						Date:&nbsp;
						<div className="board-form-button menu bg-3 color-2">
							{this.props.postToView.date}
						</div>
					</div>
					<input 
					onChange={() => this.titleChangedHandler(event.target.value)}
					className="board-form-input title" defaultValue={this.state.title} placeholder="Add a title..."/>
					<textarea 
					onChange={() => this.contentChangedHandler(event.target.value)}
					className="board-form-input content" defaultValue={this.state.content} placeholder="Add some content..."/>
					<div 
					onClick={this.clickedSubmitPostHandler}
					className="board-form-button submit bg-3 color-2">Submit Edit</div>
				</form> 

			</React.Fragment>
		: <div> LOADING </div>

		return(
			<div className="container-post-editor">	
				{postContent}
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		postToView: state.postToView,
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updatePostToView: (post) => dispatch({ type: actionTypes.POST_TO_VIEW_UPDATE, payload: { post: post }}),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditor))
