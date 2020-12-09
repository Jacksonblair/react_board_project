import React, { Component } from 'React'
import './CalendarDay.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const CalendarDay = props => {

	let elementClass = 
	`${props.day == -1 ? "calendar-day none" : "calendar-day day"} 
	${props.matchesSearchTerm ? "match" : ""} `

	return (
		<div className="calendar-day-container">
			<Link to={`/board/${props.match.params.boardid}/list`}>
				<div 
				className={`${elementClass} bg-3 color-2`}
				onClick={props.clicked ? () => props.clicked(props.day) : null }>
					{props.day == -1 ? null : props.day }
				</div> 
			</Link>
		</div>
	)
}

export default withRouter(CalendarDay)