import React, { Component } from 'React'
import './BoardEditor.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const BoardEditor = props => {

	return (
		<div className="container-board-editor">	
			<Link to={`/board/${props.match.params.boardid}`}>
				<button onClick={props.clickedBack}>
					BACK
				</button>
			</Link>
			<form>
				<label> BOARD NAME: </label>
				<input type="text" defaultValue={props.board.name}/>
				<button> SUBMIT CHANGES </button>
			</form>
		</div>
	)
}

export default withRouter(BoardEditor)