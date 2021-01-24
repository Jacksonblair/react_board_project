import React, { Component, useState } from 'react'
import './BoardDeleter.css'
import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

import {
	Link,
	withRouter
} from 'react-router-dom'

const BoardDeleter = props => {
	return (
		<div className="container-board-deleter">
			<div className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				processing={props.processing}
				canView={props.userDetails.user_id == props.currentBoard.created_by_user_id}
				resourceName="post">
				<div className="header">
					Delete board "<div className="board-to-delete">{props.currentBoard.name}</div>" ?
				</div>
				<div className="row">
					<button onClick={props.clickedConfirm}> Confirm </button>
					<Link to={`/board/${props.match.params.boardid}/edit`}> Cancel </Link>
				</div>
				</FormWrapper>
			</div>
		</div>
	)

}

export default withRouter(BoardDeleter)