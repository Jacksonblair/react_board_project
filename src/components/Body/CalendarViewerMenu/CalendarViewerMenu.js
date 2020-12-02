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

	let months = ["January", "February", "March", "April", "May",
				"June", "July", "August", "September", "October", "November", "December"]
	let monthOptions = months.map((month, i) => {
		return (
			<option key={`month-option-${i}`} value={i}>{month}</option>
		)
	})

	let years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2028, 2029]
	let yearOptions = years.map((year, i) => {
		return (
			<option key={`year-option-${i}`} value={year}>{year}</option>
		)
	})

	let nextUnitButtons = [
		(
			<React.Fragment>
				<button onClick={() => props.clickedUpdateMonth(props.month - 1)}> PREV MONTH </button>
				<button onClick={() => props.clickedUpdateMonth(props.month + 1)}> NEXT MONTH </button>
			</React.Fragment>
		),
		(
			<React.Fragment>
				<button onClick={() => props.clickedUpdateYear(props.year - 1)}> PREV YEAR </button>
				<button onClick={() => props.clickedUpdateYear(props.year + 1)}> NEXT YEAR </button>
			</React.Fragment>
		),
		( null )
	]

	let manualUnitButtons = [
		(		
			<React.Fragment>

				<label>MONTH</label>
				<select onChange={() => props.clickedUpdateMonth(event.target.value)} 
				value={props.month}>			
					{monthOptions}
				</select>	

				<label>YEAR</label>
				<select onChange={() => props.clickedUpdateYear(event.target.value)}
				value={props.year}>		
					{yearOptions}	
				</select>

			</React.Fragment>
		),
		(		
			<React.Fragment>

				<label>MONTH</label>
				<select onChange={() => props.clickedUpdateMonth(event.target.value)} 
				value={props.month}>			
					{monthOptions}
				</select>	

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
			<select onChange={() => props.clickedUpdateView(event.target.value)}
				value={props.unitView}>			
		 		<option value={0}>Days</option>
				<option value={1}>Months</option>
				<option value={2}>Years</option>
			</select>			

			{nextUnitButtons[props.unitView]}
			{manualUnitButtons[props.unitView]}

		</div>
	)
}

export default CalendarViewerMenu