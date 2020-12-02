import React, { Component } from 'React'
import './EventsViewer.css'

const EventsViewer = props => {
	return (
		<div>
			<button onClick={props.back}> BACK </button>
			{props.day}
			{props.month}
			{props.year}
		</div>
	)
}

export default EventsViewer