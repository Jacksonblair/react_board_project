import React, { Component, useState } from 'react'
import './PostDeleter.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'


import {
	Link,
	withRouter
} from 'react-router-dom'

const PostDeleter = props => {
	return (
		<div className="container-post-deleter">
			<div className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				processing={props.processing}
				canView={props.userDetails.user_id == props.currentPost.created_by_user_id}
				resourceName="post">
				<div className="header">
					Delete post "<div className="post-to-delete">{props.currentPost.title}</div>" ?
				</div>
				<div className="row">
					<button onClick={props.clickedConfirm}> Confirm </button>
					<Link to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}`}> Cancel </Link>
				</div>
				</FormWrapper>
			</div>
		</div>
	)

}

export default withRouter(PostDeleter)