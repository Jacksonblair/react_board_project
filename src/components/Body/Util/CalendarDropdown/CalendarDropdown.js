import React, { Component, useState, useEffect } from 'react'
import './CalendarDropdown.css'

const CalendarDropdown = props => {

	/*	
		On load, if we dont have a take in props.calendar to copy from
		We automatically set the month of the left and right calendar as this month.

		The calendar values are not sent to the parent component until
		a user clicks on an individual day.
	*/

	let today = new Date()
	let [ day, setDay ] = useState(null)
	let [ month, setMonth ] = useState(props.date ? props.date.getMonth() : today.getMonth())
	let [ year, setYear ] = useState(props.date ? props.date.getFullYear() : today.getFullYear())

	/* 0: Days, 1: Months, 2: Years */ /* View days by default */
	let [ dateUnit, setDateUnit ] = useState(0)

	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	let years = new Array(9).fill().map((x, i) => { return 2020 + i })

	useEffect(() => {
		if (props.date) {
			setDay(props.date.getDate())
		}
	})

	/* Function to stop click events 'bubbling' up the DOM*/
	let dontPropogate = (e) => {
		e.stopPropagation();
	}

	let clickedUnit = (event) => {
		dontPropogate(event)
		switch(dateUnit) {
			case 0: // Clicked on day, so show months
				setDateUnit(1) 
				break;
			case 1: // Clicked on months, so show years
				setDateUnit(2)
				break;
		}
	}

	let clickedLeftArrow = (event) => {
		dontPropogate(event)
		switch(dateUnit) {
			case 0: // Viewing days, so go to prev month
				if (month == 0) {
					setMonth(11)
					setYear(year - 1)
				} else {
					setMonth(month - 1)
				}
				break;
			case 1: // Viewing months, so go to prev year
				setYear(year - 1)
				break;
		}
	}

	let clickedRightArrow = (event) => {
		dontPropogate(event)
		switch(dateUnit) {
			case 0: // Viewing days, so go to prev month
				if (month == 11) {
					setMonth(0)
					setYear(year + 1)
				} else {
					setMonth(month + 1)
				}
				break;
			case 1: // Viewing months, so go to prev year
				setYear(year + 1)
				break;
		}
	}

	let clickedYear = (event, year) => {
		dontPropogate(event)
		setYear(year)
		setDateUnit(1)
	}

	let clickedMonth = (event, month) => {
		dontPropogate(event)
		setMonth(month)
		setDateUnit(0)
	}

	let clickedDay = (event, day) => {
		dontPropogate(event)
		props.clickedDay(day, month, year)
	}

	let daysInMonth = (month, year) => { 
	    return 32 - new Date(year, month, 32).getDate()
	}

	let getDayElements = (month, year) => {
		let days = []
		let firstDay = (new Date(year, month)).getDay();
		let _day = 1

		// First push in a row of names of the days of the week
		days.push(
			<div className="row" key="dd_dotwRow">
				<div className="dotw"> SUN </div> 
				<div className="dotw"> MON </div> 
				<div className="dotw"> TUE </div> 
				<div className="dotw"> WED </div> 
				<div className="dotw"> THU </div> 
				<div className="dotw"> FRI </div> 
				<div className="dotw"> SAT </div> 
			</div>
		)	

		// For 6 possible rows of calendar
		for (let i = 0; i < 6; i++) {
			let dayElements = []
			// For 7 possible days in a week
			for (let j = 0; j < 7; j++) {
				/* If not in possible days for this month */
				if (i == 0 && j < firstDay) {
					dayElements.push( 
						<div className="no-day" key={`dd_day__${i}${j}`}/>
					)			
				/* If not in possible days for this month */
				} else if (_day > daysInMonth(month, year)) {
					if (j < 7) {
						dayElements.push( 
							<div className="no-day" key={`dd_day_${i}${j}`}/>
						)
					} else {
						break
					}
				} else {
					let __day = _day
					// Add extra class if the day is 'selected'
					dayElements.push( 
						<button 
						onClick={(event) => clickedDay(event, __day)} 
						className={`day ${day == __day ? "selected" : null }`} 
						key={`dd_day${i}${j}`}>
							{_day}
						</button>
					)
					_day++
				}
			}

			days.push(
				<div className="row" key={`dd_daysRow${i}`}>
					{dayElements}
				</div>
			)
		}
	
		return (
			<div className="days">
				{days}
			</div>
		)
	}

	let getMonthElements = (calendar) => {
		let _months = []

		let monthIndex = 0
		// For 3 rows of months
		for (let i = 0; i < 3; i++) {
			let monthElements = []

			// For 4 months in a row
			for (let j = 0; j < 4; j++) {
				let _month = monthIndex
				monthElements.push(
					<button onClick={(event) => clickedMonth(event, _month)} className="month" key={`month${i}${j}`}>
						{months[monthIndex].substr(0, 3)}
					</button>
				)
				monthIndex++
			}

			_months.push(
				<div className="row" key={`monthsRow${i}`}> 
					{monthElements}
				</div>
			)
		}

		return (
			<div className="months">
				{_months}
			</div>
		)
	}

	let getYearElements = (calendar) => {
		let _years = []

		let yearIndex = 0;
		// For 3 rows of years
		for (let i = 0; i < 3; i++) {
			let yearElements = []

			// For 4 years in a row
			for (let j = 0; j < 3; j++) {
				let _year = years[yearIndex]
				yearElements.push(
					<button onClick={(event) => clickedYear(event, _year)} className="year" key={`year${i}${j}`}>
						{years[yearIndex]}
					</button>
				) 
				yearIndex++
			}

			_years.push(
				<div className="row" key={`yearsRow${i}`}> 
					{yearElements}
				</div>
			)
		}

		return (
			<div className="years">
				{_years}
			</div>
		)
	}

	return (
		<div className={`container-calendar-dropdown ${props.visible ? "visible" : null}`} > 
			<div className="menu">
				<button className="type-three" onClick={props.clickedExit}>
					Cancel
				</button>
				<div className="header">
					{props.calendarTitle}
				</div>
				<div className="controller"> 
					<button disabled={dateUnit != 0} className="type-three left" onClick={(event) => clickedLeftArrow(event)}> <i className="fas fa-arrow-left"/> </button>
					<button disabled={dateUnit == 2} className="type-three current-date" onClick={(event) => clickedUnit(event)}> 
						{ months[month] }&nbsp;
						{ year }
					</button>
					<button disabled={dateUnit != 0} className="type-three right" onClick={(event) => clickedRightArrow(event)}> <i className="fas fa-arrow-right"/>  </button>
				</div>
			</div>
			<div className="calendar">
				{ dateUnit == 0 ? 
					getDayElements(month, year, 0) 
					: dateUnit == 1 ?
						 getMonthElements(0) 
						 : getYearElements(0)
				}
			</div>
		</div>
	)

}

export default CalendarDropdown