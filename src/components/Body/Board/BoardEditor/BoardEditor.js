import React, { Component, useState } from 'react'
import './BoardEditor.css'
import {
	Link, 
	withRouter
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const BoardEditor = props => {

	let [ boardName, setBoardName ] = useState(props.currentBoard.name)
	let [ boardDescription, setBoardDescription ] = useState(props.currentBoard.description)
	let [ boardPublic, setBoardPublic ] = useState(props.currentBoard.public)

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
						<div className="toggle">
							<button onClick={() => setBoardPublic(true)} className={`type-three green ${boardPublic ? "on" : null}`}> Public <i className="fas fa-eye"></i> </button> 
							<button onClick={() => setBoardPublic(false)} className={`type-three red private ${boardPublic ? null : "on"}`}> Private <i className="fas fa-eye-slash"></i></button>
						</div>
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
						<button className="type-three" onClick={() => props.clickedSubmit(event, boardName, boardDescription, boardPublic)}> Submit </button>
						<Link className="type-three" to={`/board/${props.match.params.boardid}/`}> Cancel </Link>
					</div>			
					<div className="row">
						<Link to={`/board/${props.match.params.boardid}/delete`} className="type-three delete"> Delete Board&nbsp;<i className="fas fa-trash"></i></Link>
					</div>			
				</FormWrapper>
			</div>
		</div>
	)

}

export default withRouter(BoardEditor)