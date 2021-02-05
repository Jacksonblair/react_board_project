import React, { Component, useState } from 'react'
import './BoardMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";
import CalendarDropdown from '../../Util/CalendarDropdown/CalendarDropdown.js'

const BoardMenu = props => {

	let [ showLeftCalendarDropdown, setShowLeftCalendarDropdown ] = useState(false)
	let [ showRightCalendarDropdown, setShowRightCalendarDropdown ] = useState(false)

	let blurredCalendarDropdown = (event, calendar) => {
		if (wasClickOutsideElement(event)) {
			calendar == 0 ? setShowLeftCalendarDropdown(false) 
			: setShowRightCalendarDropdown(false)
		}
	}	

	let clickedCalendarDropdown = (calendar) => {
		calendar == 0 ? setShowLeftCalendarDropdown(!showLeftCalendarDropdown)
		: setShowRightCalendarDropdown(!showRightCalendarDropdown)
	}

	let pressedKeyCalendarDropdown = (event, calendar) => {
		if (event.charCode == 13) {
			calendar == 0 ? setShowLeftCalendarDropdown(!showLeftCalendarDropdown)
			: setShowRightCalendarDropdown(!showRightCalendarDropdown)
		}
	}

	let wasClickOutsideElement = (event, calendar) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	let clickedExit = (calendar) => {
		calendar == 0 ? setShowLeftCalendarDropdown(false) :
		setShowRightCalendarDropdown(false)
	}

	let clickedLeftDay = (day, month, year) => {
		setShowLeftCalendarDropdown(false)
		props.clickedLeftDay(day, month, year)
	}

	let clickedRightDay = (day, month, year) => {
		setShowRightCalendarDropdown(false)
		props.clickedRightDay(day, month, year)
	}

	return (
		<div className="container-board-menu">
			<div className="menu">

				<div className="row">
					<button 
					onClick={props.clickedCalendarViewer}
					disabled={props.location.pathname.includes('calendar')}
					className="icon-button">
						<i className="fas fa-calendar" title="Calendar Viewer"></i> 
					</button>
					<button 
					onClick={props.clickedListViewer}
					disabled={props.location.pathname.includes('list')}
					className="icon-button">  
						<i className="fas fa-list" title="List Viewer"></i>
					</button>

					<div className="search-wrapper">
						<input className="search" placeholder="Search..." onChange={() => props.updateSearchTerm(event.target.value)}/>
					</div>
				</div>

				{ props.showCalendar ? 
					<div className="row">
						<div className="header"> Date Range: </div>
						<div className={`calendar-button div-button ${props.startDate ? "has-date" : null}`} 
						onKeyPress={(event) => pressedKeyCalendarDropdown(event, 0)}
						onClick={(event) => clickedCalendarDropdown(0)}
						onBlur={(event) => blurredCalendarDropdown(event, 0)} 
						tabIndex={0}>
							{props.startDate ? props.startDate.toLocaleDateString("EN-au") : "dd/mm/yyyy"}
							<CalendarDropdown 
							calendarTitle="Start date"
							clickedExit={() => clickedExit(0)}
							date={props.startDate}
							clickedDay={clickedLeftDay}
							visible={showLeftCalendarDropdown}/>
						</div>
						<i className="fas fa-long-arrow-alt-right"/>
						<div className={`calendar-button div-button ${props.endDate ? "has-date" : null}`} 
						onKeyPress={(event) => pressedKeyCalendarDropdown(event, 1)}
						onClick={(event) => clickedCalendarDropdown(1)}
						onBlur={(event) => blurredCalendarDropdown(event, 1)} 
						tabIndex={0}>
							{props.endDate ? props.endDate.toLocaleDateString("EN-au") : "dd/mm/yyyy"}
							<CalendarDropdown 
							calendarTitle="End date"
							clickedExit={() => clickedExit(1)}
							date={props.endDate}
							clickedDay={clickedRightDay}
							visible={showRightCalendarDropdown}/>
						</div>
						<button disabled={!props.startDate && !props.endDate} className="clear-calendar" onClick={props.clickedClearDateRange}>
							<i className="fas fa-times"/>
						</button>
					</div>
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
					Created by:&nbsp;<Link to={`/profile/${props.currentBoard.created_by_user_id}`}> {props.currentBoard.created_by_username} </Link>
				</div>
				{ 
					props.userDetails.user_id == props.currentBoard.created_by_user_id ?
					<React.Fragment>
						&nbsp;|&nbsp; 
						<Link to={`/board/${props.match.params.boardid}/edit`} replace>
							<i className="fas fa-pen"/>&nbsp;Edit Board
						</Link>
					</React.Fragment>
					: null
				}
			</div>
		</div>
	)

}

export default withRouter(BoardMenu)