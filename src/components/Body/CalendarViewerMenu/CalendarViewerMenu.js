import React, { Component } from 'React'
import './CalendarViewerMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const CalendarViewerMenu = props => {

	/* 
		props.view = 0 (Viewing days in month)
		- Calendar Format
		- Next month
		- Prev month
		- Manual month
		- Manual year
		- Search

		props.view = 1 (Viewing months in year)
		- Calendar format
		- Next year
		- Prev year
		- Manual year
		- Search

		props.view = 3 (Viewing years (5 behind, 10 forward))
		- Calendar format
		- Search
	*/


	// <label htmlFor="cars">Choose a car:</label>

	let dateRangeNotifiers = [
		"Selecting Day",
		"Selecting Range Start",
		"Selecting Range End"
	]

	let nextUnitButtons = [
		(
			<div className="view-filter-group directions">
				<div 
				className="board-sub-menu-button calendar color-2" 
				onClick={() => props.clickedUpdateMonth(props.currentMonth - 1)}> <i className="fas fa-arrow-left color-4"> </i> &nbsp;Previous Month </div>
				<div 
				className="board-sub-menu-button calendar color-2"
				onClick={() => props.clickedUpdateMonth(props.currentMonth + 1)}> Next month &nbsp;<i className="fas fa-arrow-right color-4"></i> </div>
			</div>
		),
		(
			<div className="view-filter-group directions">
				<div 
				className="board-sub-menu-button calendar color-2"  
				onClick={() => props.clickedUpdateYear(props.currentYear - 1)}> <i className="fas fa-arrow-left color-4"> </i> &nbsp;Previous Year </div>
				<div 
				className="board-sub-menu-button calendar color-2"
				onClick={() => props.clickedUpdateYear(props.currentYear + 1)}> Next Year &nbsp;<i className="fas fa-arrow-right color-4"></i></div>
			</div>
		),
		( null )
	]

	return (
		<div className="board-sub-menu bg-1">

			<div className="view-filter-group">
				<div className="board-sub-menu-button calendar color-2" onClick={() => props.updateCalendarUnit(0)}>
					Days
				</div>
				<div className="board-sub-menu-button calendar color-2" onClick={() => props.updateCalendarUnit(1)}>
					Months
				</div>
				<div className="board-sub-menu-button calendar color-2" onClick={() => props.updateCalendarUnit(2)}>
					Years
				</div>
			</div>			

			{nextUnitButtons[props.calendarUnit]}

		</div>
	)
}

export default withRouter(CalendarViewerMenu)

{/*				<label>MONTH</label>
				<select onChange={() => props.clickedUpdateMonth(event.target.value)} 
				value={props.currentMonth}>			
					{monthOptions}
				</select>	

				<label>YEAR</label>
				<select onChange={() => props.clickedUpdateYear(event.target.value)}
				value={props.currentYear}>		
					{yearOptions}	
				</select>*/}