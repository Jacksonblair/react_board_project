import React, { Component, useState } from 'react'
import './PostEditor.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostEditor = props => {

	let [ title, setTitle ] = useState(props.currentPost.title)
	let [ content, setContent ] = useState(props.currentPost.content) 

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
						<input 
						placeholder="A post title..."
						defaultValue={props.currentPost.title}
						onChange={() => setTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="Post content..."
						defaultValue={props.currentPost.content}
						onChange={() => setContent(event.target.content)}/>
					</div>
					<div className="row">
						<button onClick={() => props.clickedSubmit(title, content)}> Submit </button>
					</div>

				</FormWrapper>
			</div>
		</div>
	)

}

export default PostEditor