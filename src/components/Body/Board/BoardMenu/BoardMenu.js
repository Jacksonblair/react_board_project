import React, { Component } from 'React'
import './BoardMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const BoardMenu = props => {
	return (
		<div className="container-board-menu">
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
					<input className="search" placeholder="Search..." onChange={() => props.updateSearchTerm(event.target.value)}/>
				</div>
				{ props.clickedUpdateDateRangeType ? 
					<React.Fragment>
					<button className="date" onClick={() => props.clickedUpdateDateRangeType(1)}>
						After: { props.dateRangeStart ? props.dateRangeStart.toLocaleDateString("EN-au") : '~' }
					</button>
					<button className="date" onClick={() => props.clickedUpdateDateRangeType(2)}>
						Before: { props.dateRangeEnd ? props.dateRangeEnd.toLocaleDateString("EN-au") : '~' }
					</button>
					<button className="date" onClick={props.clickedClearDateRange}>
						Clear
					</button>
					</React.Fragment>
				: null }
				<Link to={`/board/${props.match.params.boardid}/edit`} replace className="edit">
					<i className="fas fa-edit"></i>
				</Link>
			</div>
			<div className="name">
				{props.currentBoard.name}
			</div>
			<div className="description">
				{props.currentBoard.description}
			</div>
		</div>
	)

}

export default withRouter(BoardMenu)