import React, { Component } from 'React'
import './CalendarYear.css'

const CalendarYear = props => {

	let elementClass = `calendar-year ${props.matchesSearchTerm ? "match" : ""} `

	return (
		<div className="calendar-year-container">
			<div className={`${elementClass} bg-3 color-2`} onClick={() => props.clicked(props.year)}>
				{props.years[props.year]}
			</div>
		</div>
	)
}

export default CalendarYear