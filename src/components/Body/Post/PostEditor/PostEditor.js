import React, { Component, useState } from 'react'
import './PostEditor.css'
import {
	Link, 
	withRouter
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostEditor = props => {

	let [ title, setTitle ] = useState(props.currentPost.title)
	let [ content, setContent ] = useState(props.currentPost.content) 

	console.log(props.currentPost)
	console.log(title)
	console.log(content)

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
						defaultValue={props.currentPost.title}
						onChange={() => setTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="Post content..."
						defaultValue={props.currentPost.content}
						onChange={() => setContent(event.target.value)}/>
					</div>
					<div className="row">
						<button type="submit" onClick={() => props.clickedSubmit(event, title, content)}> Submit </button>
						<Link to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}`} > Cancel </Link>
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