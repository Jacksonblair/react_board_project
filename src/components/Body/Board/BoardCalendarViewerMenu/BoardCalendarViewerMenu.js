import React, { Component } from 'React'
import './BoardCalendarViewerMenu.css'

const BoardCalendarViewerMenu = props => {

	// Get the increment/decrement buttons based on props.calendar.unit
	let incrementDecrementButtons = [
		(
			<React.Fragment>
				<div className="group">
					<button onClick={() => props.updateCalendarMonth(props.calendar.month - 1)}>
						Prev Month
					</button>			
					<button onClick={() => props.updateCalendarMonth(props.calendar.month + 1)}>
						Next Month
					</button>
				</div>
				<div className="group">
					<button onClick={() => props.updateCalendarYear(props.calendar.year - 1)}>
						Prev Year
					</button>			
					<button onClick={() => props.updateCalendarYear(props.calendar.year + 1)}>
						Next Year
					</button>
				</div>
			</React.Fragment>
		),
		(
			<React.Fragment>
				<div className="group">
					<button onClick={() => props.updateCalendarYear(props.calendar.year - 1)}>
						Prev Year
					</button>			
					<button onClick={() => props.updateCalendarYear(props.calendar.year + 1)}>
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
					<button disabled={props.calendar.unit == props.calendarUnitEnum.DAY} 
					onClick={() => props.updateCalendarUnit(props.calendarUnitEnum.DAY)}> 
						Days
					</button>				
					<button disabled={props.calendar.unit == props.calendarUnitEnum.MONTH} 
					onClick={() => props.updateCalendarUnit(props.calendarUnitEnum.MONTH)}> 
						Months
					</button>				
					<button disabled={props.calendar.unit == props.calendarUnitEnum.YEAR}  
					onClick={() => props.updateCalendarUnit(props.calendarUnitEnum.YEAR)}> 
						Years
					</button>
				</div>
				{ incrementDecrementButtons[props.calendar.unit] }
			</div>
		</div>
	)

}

export default BoardCalendarViewerMenu