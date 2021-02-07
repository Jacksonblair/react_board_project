import React, { Component, useState } from 'react'
import './BoardCalendarViewerMenu.css'

const BoardCalendarViewerMenu = props => {

	let [ showUnitOptions, setShowUnitOptions ] = useState(false)

	let unitNames = ["Days", "Months", "Years"]

	let clickedUnitOptions = () => {
		setShowUnitOptions(!showUnitOptions)
	}

	let blurredUnitOptions = (event) => {
		if (wasClickOutsideElement(event)) {
			setShowUnitOptions(false)
		}
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	return (
		<div className="container-board-calendar-viewer-menu">
			<button className="type-three dropdown" onBlur={blurredUnitOptions} onClick={clickedUnitOptions}>
				{unitNames[props.dateUnit]}&nbsp;<i className="fas fa-caret-down"/>
				<div className={`options ${showUnitOptions ? "visible" : null}`}>
					<div className={`option ${props.dateUnit == 0 ? "disabled" : null}`} tabIndex={0} onClick={() => props.clickedUnit(0)}> Days </div>
					<div className={`option ${props.dateUnit == 1 ? "disabled" : null}`} tabIndex={0} onClick={() => props.clickedUnit(1)}> Months </div>
					<div className={`option ${props.dateUnit == 2 ? "disabled" : null}`} tabIndex={0} onClick={() => props.clickedUnit(2)}> Years </div>
				</div>
			</button>
			<div className="buttons">
				<button disabled={props.dateUnit == 2} className="type-three" onClick={props.clickedPrevUnit}><i className="fas fa-arrow-circle-left"/>&nbsp;Prev </button>
				<button disabled={props.dateUnit == 2} className="type-three" onClick={props.clickedNextUnit}> Next&nbsp;<i className="fas fa-arrow-circle-right"/> </button>
			</div>
		</div>
	)

}

export default BoardCalendarViewerMenu