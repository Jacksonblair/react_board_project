import React, { Component } from 'React'
import './CalendarDay.css'

const CalendarDay = props => {

	let styles = []

	return (
		<div className="calendar-day-container">
			<div 
			className={props.day == -1 ? "calendar-day none" : "calendar-day day"}
			onClick={props.clicked ? () => props.clicked(props.day) : null }>
				{props.day == -1 ? null : props.day }
			</div> 
		</div>
	)
}

export default CalendarDay