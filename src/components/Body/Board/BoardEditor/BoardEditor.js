import React, { Component, useState } from 'react'
import './BoardEditor.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const BoardEditor = props => {

	let [ boardName, setBoardName ] = useState(props.currentBoard.name)
	let [ boardDescription, setBoardDescription ] = useState(props.currentBoard.description)

	return (
		<div className="container-board-editor">
			<div className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userDetails.user_id == props.currentBoard.created_by_user_id}
				resourceName="profile">

					<div className="header">
						Editing Board
					</div>
					<div className="row">
						<input 
						placeholder="A board name..."
						defaultValue={props.currentBoard.name}
						onChange={() => setBoardName(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="A board description..."
						defaultValue={props.currentBoard.description}
						onChange={() => setBoardDescription(event.target.value)}/>
					</div>
					<div className="row">
						<button onClick={() => props.clickedSubmit(boardName, boardDescription)}> Submit </button>
					</div>

				</FormWrapper>
			</div>
		</div>
	)

}

export default BoardEditor