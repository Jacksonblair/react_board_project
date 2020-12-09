import React, { Component } from 'React'
import './BoardMenu.css'
import {
	Link
} from "react-router-dom";

const BoardMenu = props => {

	let menuButtons = props.loaded ? 
		<React.Fragment>
			<Link to={`/board/${props.board.id}/calendar`} replace>
				<div className={"board-format-button color-2"}>
					<i className="far fa-calendar-alt"></i>
				</div>
			</Link>
			<Link to={`/board/${props.board.id}/list`} replace>
				<div className={"board-format-button color-2"}>
					<i className="fas fa-th-list"></i>
				</div>
			</Link>
			<div className={"board-search-input-container"}>
				<input 
				onChange={() => props.updateSearchTerm(event.target.value)} 
				type="text" 
				value={props.searchTerm}
				placeholder="Search..."/>
			</div>
			<Link to={`/board/${props.board.id}/edit`} replace>
				<div className="board-format-button edit-board color-2">
					EDIT BOARD
				</div>
			</Link>
		</React.Fragment>
		: <div> LOADING </div>

	return (

		<div className="container-board-menu bg-3">	
			<div className="board-menu-board-name color-6">
				{props.loaded ? props.board.name : "LOADING"}
			</div>
			<div className="container-board-menu-buttons">
				{menuButtons}
			</div>
		</div>
	)
}

export default BoardMenu