import React, { Component } from 'React'
import './BoardButton.css'
import {
	Link
} from "react-router-dom";

const BoardButton = props => {
	return (
		<Link to={`/board/${props.board.id}`}>
			<div className="container-board-button bg-1">	
				<div className="board-button-board-name color-6">
					#{props.board.name}
				</div>
				<div className="board-button-board-blurb color-2">
					"Board for travel plans"
				</div>
				<div className="board-button-board-info-container">
					<div className="board-button-board-post-count color-5">
						Posts: 3 
					</div>
					<div className="board-button-board-owner color-5">
						Owner: You 
					</div>
				</div>
			</div>
		</Link>
	)
}

export default BoardButton