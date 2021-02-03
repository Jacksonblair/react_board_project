import React, { Component } from 'react'
import './BoardCalendarViewerMenu.css'

const BoardCalendarViewerMenu = props => {

	// Get the increment/decrement buttons based on props.calendar.unit
	let incrementDecrementButtons = [
		(
			<React.Fragment>
				<div className="group">
					<button onClick={props.clickedPrevMonth}>
						Prev Month
					</button>			
					<button onClick={props.clickedNextMonth}>
						Next Month
					</button>
				</div>
				<div className="group">
					<button onClick={props.clickedPrevYear}>
						Prev Year
					</button>			
					<button onClick={props.clickedNextYear}>
						Next Year
					</button>
				</div>
			</React.Fragment>
		),
		(
			<React.Fragment>
				<div className="group">
					<button onClick={props.clickedPrevYear}>
						Prev Year
					</button>			
					<button onClick={props.clickedNextYear}>
						Next Year
					</button>
				</div>
			</React.Fragment>
		),
		null
	]

	return (
		<div className="container-board-calendar-viewer-menu">
			<div className="board-sub-menu">
				<div className="group">
					<button disabled={props.dateUnit == 0} 
					onClick={() => props.updateDateUnit(0)}> 
						Days
					</button>				
					<button disabled={props.dateUnit == 1} 
					onClick={() => props.updateDateUnit(1)}> 
						Months
					</button>				
					<button disabled={props.dateUnit == 2}  
					onClick={() => props.updateDateUnit(2)}> 
						Years
					</button>
				</div>
				{ incrementDecrementButtons[props.dateUnit] }
			</div>
		</div>
	)

}

export default BoardCalendarViewerMenu