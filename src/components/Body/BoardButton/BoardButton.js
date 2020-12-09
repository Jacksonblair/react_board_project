import React, { Component } from 'React'
import './BoardButton.css'
import {
	Link
} from "react-router-dom";

const BoardButton = props => {
	return (
		<Link to={`/board/${props.board.id}`}>
			<button className="container-board-list-button">	
				{props.board.name}
			</button>
		</Link>
	)
}

export default BoardButton