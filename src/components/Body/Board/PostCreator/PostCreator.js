import React, { Component, useEffect } from 'react'
import './PostCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PostCreator = props => {

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
						<button type="button" onClick={props.clickedUpdateDateRangeType}> Date: {props.postTargetDate.toLocaleDateString("EN-au")} </button>
					</div>					
					<div className="row">
						<input 
						defaultValue={props.newPostTitle}
						placeholder="A post title..."
						onChange={() => props.updateNewPostTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						defaultValue={props.newPostContent}
						placeholder="Some content..."
						onChange={() => props.updateNewPostContent(event.target.value)}/>
					</div>
					<div className="row">
						<button type="submit" onClick={props.clickedSubmit}> Submit </button>
					</div>
				</FormWrapper>
			</form>
		</div>
	)

}

export default PostCreator