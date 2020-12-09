import React, { Component } from 'React'
import './BodyMenu.css'

const BodyMenu = props => {

	return (
		<div>
			<button onClick={props.clickedCalendarView}> CALENDAR </button>
			<button onClick={props.clickedListView}> LIST </button>
		</div>
	)
}

export default BodyMenu