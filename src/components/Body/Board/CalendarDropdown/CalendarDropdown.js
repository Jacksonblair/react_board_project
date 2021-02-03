import React, { Component, useState } from 'react'
import './CalendarDropdown.css'

const CalendarDropdown = props => {

	/*	
		On load, if we dont have a take in props.calendar to copy from
		We automatically set the month of the left and right calendar as this month.

		The calendar values are not sent to the parent component until
		a user clicks on an individual day.
	*/

	console.log(props.startDate ? props.startDate.toLocaleDateString("EN-au") : null)

	let today = new Date()
	let [ leftMonth, setLeftMonth ] = useState(props.startDate ? props.startDate.getMonth() : today.getMonth())
	let [ leftYear, setLeftYear ] = useState(props.startDate ? props.startDate.getFullYear() : today.getFullYear())
	let [ rightMonth, setRightMonth ] = useState(props.endDate ? props.endDate.getMonth() : today.getMonth())
	let [ rightYear, setRightYear ] = useState(props.endDate ? props.endDate.getFullYear() : today.getFullYear())

	/* 0: Days, 1: Months, 2: Years */ /* View days by default */
	let [ leftDateUnit, setLeftDateUnit ] = useState(0)
	let [ rightDateUnit, setRightDateUnit ] = useState(0)

	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	let years = new Array(9).fill().map((x, i) => { return 2020 + i })

	/* Function to stop click events 'bubbling' up the DOM*/
	let dontPropogate = (e) => {
		e.stopPropagation();
	}

	let clickedUnit = (event, calendar) => {
		dontPropogate(event)
		let dateUnit = calendar == 0 ? leftDateUnit : rightDateUnit
		switch(dateUnit) {
			case 0: // Clicked on day, so show months
				calendar == 0 ? setLeftDateUnit(1) : setRightDateUnit(1)
				break;
			case 1: // Clicked on months, so show years
				calendar == 0 ? setLeftDateUnit(2) : setRightDateUnit(2)
				break;
		}
	}

	let clickedLeftArrow = (event, calendar) => {
		dontPropogate(event)
		let dateUnit = calendar == 0 ? leftDateUnit : rightDateUnit
		switch(dateUnit) {
			case 0: // Viewing days, so go to prev month
				let month = calendar == 0 ? leftMonth : rightMonth
				let year = calendar == 0 ? leftYear : rightYear
				if (month == 0) {
					calendar == 0 ? setLeftMonth(11) : setRightMonth(11)
					calendar == 0 ? setLeftYear(year - 1) : setRightYear(year - 1)
				} else {
					calendar == 0 ? setLeftMonth(month - 1) : setRightMonth(month - 1)
				}
				break;
			case 1: // Viewing months, so go to prev year
				calendar == 0 ? setLeftYear(year - 1) : setRightYear(year - 1)
				break;
		}
	}

	let clickedRightArrow = (event, calendar) => {
		dontPropogate(event)
		let dateUnit = calendar == 0 ? leftDateUnit : rightDateUnit
		switch(dateUnit) {
			case 0: // Viewing days, so go to next month
				let month = calendar == 0 ? leftMonth : rightMonth
				let year = calendar == 0 ? leftYear : rightYear
				if (month == 11) {
					calendar == 0 ? setLeftMonth(0) : setRightMonth(0)
					calendar == 0 ? setLeftYear(year + 1) : setRightYear(year + 1)
				} else {
					calendar == 0 ? setLeftMonth(month + 1) : setRightMonth(month + 1)
				}
				break;
			case 1: // Viewing months, so go to next year
				calendar == 0 ? setLeftYear(year + 1) : setRightYear(year + 1)
				break;
		}
	}

	let clickedYear = (event, year, calendar) => {
		dontPropogate(event)
		calendar == 0 ? setLeftYear(year) : setRightYear(year)
		calendar == 0 ? setLeftDateUnit(1) : setRightDateUnit(1)
		console.log(year)
	}

	let clickedMonth = (event, month, calendar) => {
		dontPropogate(event)
		calendar == 0 ? setLeftMonth(month) : setRightMonth(month)
		calendar == 0 ? setLeftDateUnit(0) : setRightDateUnit(0)
		console.log(month)
	}

	let clickedDay = (event, day, calendar) => {
		dontPropogate(event)
		props.clickedDay(day, (calendar == 0 ? leftMonth : rightMonth), (calendar == 0 ? leftYear : rightYear), calendar)
	}

	let daysInMonth = (month, year) => { 
	    return 32 - new Date(year, month, 32).getDate()
	}

	let getDayElements = (month, year, calendar) => {
		let days = []
		let firstDay = (new Date(year, month)).getDay();
		let day = 1

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
				} else if (day > daysInMonth(month, year)) {
					if (j < 7) {
						dayElements.push( 
							<div className="no-day" key={`dd_day_${i}${j}`}/>
						)
					} else {
						break
					}
				} else {
					let _day = day
					dayElements.push( 
						<button onClick={(event) => clickedDay(event, _day, calendar)} className="day" key={`dd_day${i}${j}`}>
							{day}
						</button>
					)
					day++
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
					<button onClick={(event) => clickedMonth(event, _month, calendar)} className="month" key={`month${i}${j}`}>
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
					<button onClick={(event) => clickedYear(event, _year, calendar)} className="year" key={`year${i}${j}`}>
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
			<div className="left-calendar">
				<div className="header">
					Start Date
				</div>
				<div className="controller"> 
					<button className="left" onClick={(event) => clickedLeftArrow(event, 0)}> <i className="fas fa-arrow-left"/> </button>
					<button className="current-date" onClick={(event) => clickedUnit(event, 0)}> 
						{ months[leftMonth] }&nbsp;
						{ leftYear }
					</button>
					<button className="right" onClick={(event) => clickedRightArrow(event, 0)}> <i className="fas fa-arrow-right"/>  </button>
				</div>
				{ leftDateUnit == 0 ? 
					getDayElements(leftMonth, leftYear, 0) 
					: leftDateUnit == 1 ?
						 getMonthElements(0) 
						 : getYearElements(0)
				}
			</div>
			<div className="right-calendar">
				<div className="header">
					End Date
				</div>
				<div className="controller"> 
					{ rightDateUnit == 0 ? 
					<button className="left" onClick={(event) => clickedLeftArrow(event, 1)}> <i className="fas fa-arrow-left"/> </button>
					: null }

					{ rightDateUnit == 0 ? 
						<button className="current-date" onClick={(event) => clickedUnit(event, 1)}> 
							{ months[rightMonth] } &nbsp;
							{ leftYear }
						</button>
						: rightDateUnit == 1 ?
						<button className="current-date" onClick={(event) => clickedUnit(event, 1)}> 
							{ leftYear }
						</button>
						: null
					}

					{ rightDateUnit == 0 ? 
					<button className="right" onClick={(event) => clickedRightArrow(event, 1)}> <i className="fas fa-arrow-right"/>  </button>
					: null }
				</div>
				{ rightDateUnit == 0 ? 
					getDayElements(rightMonth, rightYear, 1) 
					: rightDateUnit == 1 ?
						 getMonthElements(1) 
						 : getYearElements(1)
				}
			</div>
		</div>
	)

}

export default CalendarDropdown