import React, { Component } from 'React'
import './CalendarMonth.css'

const CalendarMonth = props => {

	return (
		<div className="calendar-month-container">
			<div className="calendar-month" onClick={() => props.clicked(props.month)}>
				{props.months[props.month]}
			</div>
		</div>
	)
}

export default CalendarMonth