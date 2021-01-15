import React, { Component, useState } from 'react'
import './BoardCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const BoardCreator = props => {

	let [ boardName, setBoardName ] = useState("")
	let [ boardDescription, setBoardDescription ] = useState("")

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
						Creating New Board
					</div>
					<div className="row">
						<input 
						placeholder="A board name..."
						onChange={() => setBoardName(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="A board description..."
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

export default BoardCreator