import React, { Component, useEffect } from 'react'
import './BoardEditor.css'

const BoardEditor = props => {

	/* On dismount clear errors relative to the <BoardEditor> from <Board> */
	useEffect(() => {
		return () => props.clearErrors()
	})

	/*
		When this component loads, we need do a client check if the id of the owner of
		.. the board is the same as the current user
		Otherwise display an error message
	*/

	let content = props.processing ? <div className="loading-message"> <i className="fas fa-asterisk"/> </div> 
	: props.userDetails.user_id == props.currentBoard.created_by_user_id ? 
		<React.Fragment>
			{ props.serverError ? 
			<div className="row">	
				<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }

			<div className="header">
				Editing Board
			</div>
			<div className="row">
				<input 
				placeholder="A board name..."
				defaultValue={props.currentBoard.name}
				onChange={() => props.editedBoardName(event.target.value)}/>
			</div>
			<div className="row">
				<textarea 
				placeholder="A board description..."
				defaultValue={props.currentBoard.description}
				onChange={() => props.editedBoardDescription(event.target.value)}/>
			</div>
			<div className="row">
				<button onClick={props.clickedSubmit}> Submit </button>
			</div>

			{ props.formError ? 
			<div className="row">
				<div className="form-error"> {props.formError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }
		</React.Fragment>
	: <div className="row">
		<div className="server-error"> You cannot edit this board <i className="fas fa-exclamation"/> </div>
	</div>

	return (
		<div className="container-board-editor">
			<div className="board-form">
				{content}
			</div>
		</div>
	)

}

export default BoardEditor