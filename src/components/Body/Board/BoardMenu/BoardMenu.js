import React, { Component } from 'react'
import './BoardMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const BoardMenu = props => {

	return (
		<div className="container-board-menu">
			<div className="menu">
				<div className="row">
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
				</div>
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
				{ 
					props.userDetails.user_id == props.currentBoard.created_by_user_id ?
					<Link to={`/board/${props.match.params.boardid}/edit`} replace className="edit">
						<i className="fas fa-edit"></i>
					</Link>
					: null
				} 

			</div>
			<div className="name">
				{props.currentBoard.name}
			</div>
			<div className="description">
				"{props.currentBoard.description}"
			</div>
			<div className="about">
				<div className={`${props.currentBoard.public ? "public" : "private"}`}>
					{props.currentBoard.public ? 
						<React.Fragment> PUBLIC <i className="fas fa-eye"></i> </React.Fragment> 
						: <React.Fragment> PRIVATE <i className="fas fa-eye-slash"></i></React.Fragment> }
				</div>
				&nbsp;|&nbsp; 
				<div className="author">
					Author:&nbsp;<Link to={`/profile/${props.currentBoard.created_by_user_id}`}> {props.currentBoard.created_by_username} </Link>
				</div>
			</div>
		</div>
	)

}

export default withRouter(BoardMenu)