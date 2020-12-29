import React, { Component } from 'React'
import './BoardMenu.css'
import {
	Link
} from "react-router-dom";

const BoardMenu = props => {

	let menuButtons = props.loaded ? 
		<React.Fragment>
			<Link className="board-format-button color-2" to={`/board/${props.board.id}/calendar`} replace>
				<i className="far fa-calendar-alt"></i>
			</Link>
			<Link className={"board-format-button color-2"} to={`/board/${props.board.id}/list`} replace>
				<i className="fas fa-th-list"></i>
			</Link>
			<div className={"board-search-input-container"}>
				<input 
				onChange={() => props.updateSearchTerm(event.target.value)} 
				type="text" 
				value={props.searchTerm}
				placeholder="Search..."/>
			</div>
			<Link className="board-format-button edit-board color-2" to={`/board/${props.board.id}/edit`} replace>
				<div className="edit-board-button-text"> 
					EDIT BOARD&nbsp;
				</div>
				<div className="edit-board-button-icon"> 
					<i className="fas fa-cog"></i>
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