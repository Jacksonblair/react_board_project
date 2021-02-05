import React, { Component, useState } from 'react'
import './BoardCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const BoardCreator = props => {

	let [ boardName, setBoardName ] = useState("")
	let [ boardDescription, setBoardDescription ] = useState("")
	let [ boardPublic, setBoardPublic ] = useState(true)

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
						Creating New Board
					</div>
					<div className="row">
						<div className="toggle">
							<button onClick={() => setBoardPublic(true)} className={`type-three green ${boardPublic ? "on" : "off"}`}> Public <i className="fas fa-eye"></i> </button> 
							<button onClick={() => setBoardPublic(false)} className={`type-three red ${boardPublic ? "off" : "on"}`}> Private <i className="fas fa-eye-slash"></i></button>
						</div>
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
						<button className="type-three" type="submit" onClick={() => props.clickedSubmit(boardName, boardDescription, boardPublic)}> Submit </button>
					</div>

				</FormWrapper>
			</form>
		</div>
	)

}

export default BoardCreator