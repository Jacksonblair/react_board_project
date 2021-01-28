import React, { Component, useEffect } from 'react'
import './PostEditor.css'
import {
	Link, 
	withRouter
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostEditor = props => {

	useEffect(() => {
		// If we're editing a different post, we update the store
		if (props.editedPostId != props.currentPost.id) {
			props.updateEditedPostTitle(props.currentPost.title)
			props.updateEditedPostContent(props.currentPost.content)
			props.updateEditedPostId(props.currentPost.id)
		} else {
			// We've come back to editing the same post.	
		}
	}, [])


	return (
		<div className="container-post-editor">
			<div className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userDetails.user_id == props.currentPost.created_by_user_id}
				resourceName="post">

					<div className="header">
						Editing Post
					</div>
					<div className="row">
						<button onClick={props.clickedPostDate}> Date: {props.postTargetDate.toLocaleDateString("EN-au")} </button>
					</div>		
					<div className="row">
						<input 
						placeholder="A post title..."
						value={props.editedPostTitle}
						onChange={() => props.updateEditedPostTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="Post content..."
						value={props.editedPostContent}
						onChange={() => props.updateEditedPostContent(event.target.value)}/>
					</div>
					<div className="row">
						<button type="submit" onClick={props.clickedSubmit}> Submit </button>
						<Link to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}`} onClick={props.cancelPostEdit} > Cancel </Link>
					</div>			
					<div className="row">
						<Link to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}/delete`} className="delete"> Delete Post&nbsp;<i className="fas fa-trash"></i></Link>
					</div>		

				</FormWrapper>
			</div>
		</div>
	)

}

export default withRouter(PostEditor)