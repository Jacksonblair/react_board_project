import React, { Component } from 'React'
import './CalendarViewerMenu.css'

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


	let monthOptions = props.months.map((month, i) => {
		return (
			<option key={`month-option-${i}`} value={i}>{month}</option>
		)
	})

	let yearOptions = props.years.map((year, i) => {
		return (
			<option key={`year-option-${i}`} value={year}>{year}</option>
		)
	})

	let nextUnitButtons = [
		(
			<React.Fragment>
				<button onClick={() => props.clickedUpdateMonth(props.currentMonth - 1)}> PREV MONTH </button>
				<button onClick={() => props.clickedUpdateMonth(props.currentMonth + 1)}> NEXT MONTH </button>
			</React.Fragment>
		),
		(
			<React.Fragment>
				<button onClick={() => props.clickedUpdateYear(props.currentYear - 1)}> PREV YEAR </button>
				<button onClick={() => props.clickedUpdateYear(props.currentYear + 1)}> NEXT YEAR </button>
			</React.Fragment>
		),
		( null )
	]

	return (
		<div className="container-calendar-viewer-menu">

			<form>
				<input type="text" placeholder="search"/>
			</form>

			<label>VIEW</label>
			<select onChange={() => props.clickedUpdateCalendarUnit(event.target.value)}
				value={props.calendarUnit}>			
		 		<option value={0}>Days</option>
				<option value={1}>Months</option>
				<option value={2}>Years</option>
			</select>			

			{nextUnitButtons[props.calendarUnit]}

			<label>MONTH</label>
			<select onChange={() => props.clickedUpdateMonth(event.target.value)} 
			value={props.currentMonth}>			
				{monthOptions}
			</select>	

			<label>YEAR</label>
			<select onChange={() => props.clickedUpdateYear(event.target.value)}
			value={props.currentYear}>		
				{yearOptions}	
			</select>

		</div>
	)
}

export default CalendarViewerMenu