import React, { Component } from 'React'
import './CalendarMonth.css'

const CalendarMonth = props => {

	let elementClass = `calendar-month ${props.matchesSearchTerm ? "match" : ""}`

	return (
		<div className="calendar-month-container">
			<div className={`${elementClass} bg-3 color-2`} onClick={() => props.clicked(props.month)}>
				{props.months[props.month]}
			</div>
		</div>
	)
}

export default CalendarMonth