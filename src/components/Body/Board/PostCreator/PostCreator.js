import React, { Component, useState } from 'react'
import './PostCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostCreator = props => {

	let [ postTitle, setPostTitle ] = useState("")
	let [ postContent, setPostContent ] = useState("")

	return (
		<div className="container-board-creator"> 
			<div className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={true}
				resourceName="profile">

					<div className="header">
						Creating New Post
					</div>
					<div className="row">
						<input 
						placeholder="A post title..."
						onChange={() => setPostTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="Some content..."
						onChange={() => setPostContent(event.target.value)}/>
					</div>
					<div className="row">
						<button onClick={() => props.clickedSubmit(postTitle, postContent)}> Submit </button>
					</div>

				</FormWrapper>
			</div>
		</div>
	)

}

export default PostCreator