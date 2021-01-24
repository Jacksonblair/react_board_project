import React, { Component, useState } from 'react'
import './PostCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostCreator = props => {

	let [ postTitle, setPostTitle ] = useState("")
	let [ postContent, setPostContent ] = useState("")

	return (
		<div className="container-board-creator"> 
			<form className="board-form">
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
						<button onClick={props.clickedUpdateDateRangeType}> Date: {props.postTargetDate.toLocaleDateString("EN-au")} </button>
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
						<button type="submit" onClick={() => props.clickedSubmit(event, postTitle, postContent)}> Submit </button>
					</div>
				</FormWrapper>
			</form>
		</div>
	)

}

export default PostCreator