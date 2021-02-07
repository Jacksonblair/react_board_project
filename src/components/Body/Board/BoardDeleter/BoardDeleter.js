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
			<form className="board-form">
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
					<button className="type-three" onClick={props.clickedConfirm}> Confirm </button>
					<Link className="type-three" to={`/board/${props.match.params.boardid}/edit`}> Cancel </Link>
				</div>
				</FormWrapper>
			</form>
		</div>
	)

}

export default withRouter(BoardDeleter)