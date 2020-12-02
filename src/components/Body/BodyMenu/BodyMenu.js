import React, { Component } from 'React'
import './BodyMenu.css'

const BodyMenu = props => {
	return (
		<div>
			<button onClick={() => props.clickedUpdateViewType(0)}> CALENDAR </button>
			<button onClick={() => props.clickedUpdateViewType(1)}> LIST </button>
		</div>
	)
}

export default BodyMenu