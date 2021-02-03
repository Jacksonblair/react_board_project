import React, { Component, useState } from 'react'
import './BoardMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown.js'

const BoardMenu = props => {

	let [ showCalendarDropdown, setShowCalendarDropdown ] = useState(true)

	let blurredCalendarDropdown = (event) => {
		console.log("Blurred")
		if (wasClickOutsideElement(event)) {
			setShowCalendarDropdown(false)
		}
	}	

	let clickedCalendarDropdown = () => {
		setShowCalendarDropdown(!showCalendarDropdown)
	}

	let pressedKeyCalendarDropdown = (event) => {
		if (event.charCode == 13) {
			setShowCalendarDropdown(!showCalendarDropdown)
		}
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	let clickedCalendarDay = (calendarSide, day) => {

	}

	return (
		<div className="container-board-menu">
			<div className="menu">
				<div className="row">

					<button 
					onClick={props.clickedCalendarViewer}
					disabled={props.location.pathname.includes('calendar')}
					className="calendar">
						<i className="fas fa-calendar" title="Calendar Viewer"></i> 
					</button>
					<button 
					onClick={props.clickedListViewer}
					disabled={props.location.pathname.includes('list')}
					className="list">  
						<i className="fas fa-list" title="List Viewer"></i>
					</button>

				</div>

				<div className="search-wrapper">
					<input className="search" placeholder="Search..." onChange={() => props.updateSearchTerm(event.target.value)}/>
				</div>

				{ 
					props.clickedDay ? 
					<React.Fragment>
						<div className="date div-button" 
						onKeyPress={pressedKeyCalendarDropdown}
						onClick={clickedCalendarDropdown}
						onBlur={blurredCalendarDropdown} 
						tabIndex={0}>
							Select Date Range
							<CalendarDropdown 
							startDate={props.startDate}
							endDate={props.endDate}
							clickedDay={props.clickedDay}
							visible={showCalendarDropdown}/>
						</div>
						<button className="date" onClick={props.clickedClearDateRange}>
							Clear
						</button>
					</React.Fragment>
					: null 
				}
				
				{ 
					props.userDetails.user_id == props.currentBoard.created_by_user_id ?
					<Link to={`/board/${props.match.params.boardid}/edit`} replace className="edit">
						<i className="fas fa-edit" title="Edit Board"></i>
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