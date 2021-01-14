import React, { Component, useEffect } from 'react'
import './PostEditor.css'

const PostEditor = props => {

	console.log(props)

	/* On dismount clear errors relative to the <PostEditor> from <Post> */
	useEffect(() => {
		return () => props.clearErrors()
	}, [])

	/*
		When this component loads, we need do a client check if the id of the owner of
		.. the post is the same as the current user
		Otherwise display an error message
	*/

	let content = props.processing ? <div className="loading-message"> <i className="fas fa-asterisk"/> </div> 
	: props.userDetails.user_id == props.currentPost.created_by_user_id ? 
		<React.Fragment>
			{ props.serverError ? 
			<div className="row">	
				<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }

			<div className="header">
				Editing Post
			</div>
			<div className="row">
				<input 
				placeholder="A post title..."
				defaultValue={props.currentPost.name}
				onChange={() => props.editedPostName(event.target.value)}/>
			</div>
			<div className="row">
				<textarea 
				placeholder="Post content..."
				defaultValue={props.currentPost.content}
				onChange={() => props.editedPostName(event.target.value)}/>
			</div>
			<div className="row">
				<button onClick={props.clickedSubmit}> Submit </button>
			</div>

			{ props.formError ? 
			<div className="row">
				<div className="form-error"> {props.formError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }
		</React.Fragment>
	: <div className="row">
		<div className="server-error"> You cannot edit this post <i className="fas fa-exclamation"/> </div>
	</div>

	return (
		<div className="container-post-editor">
			<div className="board-form">
				{content}
			</div>
		</div>
	)

}

export default PostEditor