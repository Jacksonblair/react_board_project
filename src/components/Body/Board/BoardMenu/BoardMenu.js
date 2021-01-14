import React, { Component } from 'React'
import './BoardMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const BoardMenu = props => {

	console.log(props)

	return (
		<div className="container-board-menu"> 
			<div className="name">
				{props.currentBoard.name}
			</div>
			<div className="description">
				{props.currentBoard.description}
			</div>
			<div className="menu">
				<button 
				onClick={props.clickedCalendarViewer}
				disabled={props.location.pathname.includes('calendar')}
				className="calendar">
					<i className="fas fa-calendar"></i> 
				</button>
				<button 
				onClick={props.clickedListViewer}
				disabled={props.location.pathname.includes('list')}
				className="list">  
					<i className="fas fa-list"></i>
				</button>
				<div className="wrapper">
					<input className="search"/>
				</div>
				<Link to={`/board/${props.match.params.boardid}/edit`} className="edit">
					<i className="fas fa-cog"></i> 
				</Link>
			</div>
		</div>
	)

}

export default withRouter(BoardMenu)