import React, { Component } from 'React'
import './CalendarYear.css'

const CalendarYear = props => {

	return (
		<div className="calendar-year-container">
			<div className="calendar-year" onClick={() => props.clicked(props.year)}>
				{props.years[props.year]}
			</div>
		</div>
	)
}

export default CalendarYear