import React, { Component, useState, useEffect } from 'react'
import './BoardCalendarViewer.css'

import BoardCalendarViewerMenu from '../BoardCalendarViewerMenu/BoardCalendarViewerMenu.js'
import FuzzySearch from 'fuzzy-search'

/* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d */

const BoardCalendarViewer = props => {

	// Get array of years from current year to 10 years in the future
	let years = new Array(10).fill().map((x, i) => { return 2020 + i })
	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	
	let today = new Date()
	let [ month, setMonth ] = useState(today.getMonth())
	let [ year, setYear ] = useState(today.getFullYear())

	/* 0: Days, 1: Months, 2: Years */ /* View days by default */
	let [ dateUnit, setDateUnit ] = useState(0)

	let clickedCalendarMenuUnitHandler = (unit) => {
		setDateUnit(unit)
	}

	let clickedCalendarMenuNextUnitHandler = () => {
		switch(dateUnit) {
			case 0:
				if (month == 11) {
					setYear(year + 1)
					setMonth(0)
				} else {
					setMonth(month + 1)
				}
				break;
			case 1:
				setYear(year + 1)
				break;
		}
	}

	let clickedCalendarMenuPrevUnitHandler = () => {
		switch(dateUnit) {
			case 0:
				if (month == 0) {
					setYear(year - 1)
					setMonth(11)
				} else {
					setMonth(month - 1)
				}
				break;
			case 1:
				setYear(year - 1)
				break;
		}
	}


	let clickedMonth = (month) => {
		setMonth(month)
		setDateUnit(0)
	}	

	let clickedYear = (year) => {
		setYear(year)
		setDateUnit(1)
	}

	let daysInMonth = (month, year) => { 
	    return 32 - new Date(year, month, 32).getDate()
	}

	let getDayPostCount = (day, month, year) => {
		let count = 0
		props.posts.forEach((post) => {
			let date = post.target_date.split('/')
			if (date[2] == year && date[1] == (month + 1) && date[0] == day) {
				count++
			}
		})
		return count
	}

	let getMonthPostCount = (month, year) => {
		let count = 0
		props.posts.forEach((post) => {
			let date = post.target_date.split('/')
			if (date[2] == year && date[1] == (month + 1)) {
				count++
			}
		})
		return count
	}

	let getYearPostCount = (year) => {
		let count = 0
		props.posts.forEach((post) => {
			let date = post.target_date.split('/')
			if (date[2] == year) {
				count++
			}
		})
		return count
	}

	let getDayMatch = (day, month, year) => {
		let match = false
		if (props.searchTerm) {
			props.posts.forEach((post) => {
				let date = post.target_date.split('/')
				if (date[2] == year && date[1] == (month + 1) && date[0] == day) {
					match = true
				}
			})
		}
		return match
	}

	let getMonthMatch = (month, year) => {
		let match = false
		if (props.searchTerm) {
			props.posts.forEach((post) => {
				let date = post.target_date.split('/')
				if (date[2] == year && date[1] == (month + 1)) {
					match = true
				}
			})
		}
		return match
	}

	let getYearMatch = (year) => {
		let match = false
		if (props.searchTerm) {
			props.posts.forEach((post) => {
				let date = post.target_date.split('/')
				if (date[2] == year) {
					match = true
				}
			})
		}
		return match
	}

	let getDayElements = () => {
		let days = []

		let firstDay = (new Date(month, year)).getDay();
		let day = 1
		// For 6 possible rows of calendar
		for (let i = 0; i < 6; i++) {
			let dayElements = []
			// For 7 possible days in a week
			for (let j = 0; j < 7; j++) {
				/* If not in possible days for this month */
				if (i == 0 && j < firstDay) {
					dayElements.push( 
						<div className="no-day" key={`_day${i}${j}`}/>
					)			
				/* If not in possible days for this month */
				} else if (day > daysInMonth(month, year)) {
					if (j < 7) {
						dayElements.push( 
							<div className="no-day" key={`day__${i}${j}`}/>
						)
					} else {
						break
					}
				} else {
					let _day = day
					let postCount = getDayPostCount(_day, month, year)
					dayElements.push( 
						<button onClick={() => props.clickedDay(_day, month, year)} 
						className={`day ${getDayMatch(_day, month, year) ? "match" : props.searchTerm ? "nomatch" : null}`} 
						key={`day${i}${j}`}>
							{day}
							{ postCount > 0 ? <div className="post-count"> {postCount} <div>&nbsp;posts </div> </div> : null }
						</button>
					)
					day++
				}
			}

			days.push(
				<div className="row" key={`daysRow${i}`}>
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

	let getMonthElements = () => {
		let _months = []

		let monthIndex = 0
		// For 3 rows of months
		for (let i = 0; i < 3; i++) {
			let monthElements = []

			// For 4 months in a row
			for (let j = 0; j < 4; j++) {
				let _monthIndex = monthIndex
				let postCount = getMonthPostCount(_monthIndex, year)
				monthElements.push(
					<button onClick={() => clickedMonth(_monthIndex) } 
					className={`month ${getMonthMatch(_monthIndex, year) ? "match" : props.searchTerm ? "nomatch" : null}`} 
					key={`month${i}${j}`}>
						{months[monthIndex].substr(0, 3)}
						{ postCount > 0 ? <div className="post-count"> {postCount} <div>&nbsp;posts </div> </div> : null }
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

	let getYearElements = () => {
		let _years = []

		let yearIndex = 0;
		// For 3 rows of years
		for (let i = 0; i < 3; i++) {
			let yearElements = []

			// For 4 years in a row
			for (let j = 0; j < 3; j++) {
				let _year = years[yearIndex]
				let postCount = getYearPostCount(_year)
				yearElements.push(
					<button onClick={() => clickedYear(_year)} 
					className={`year ${getYearMatch(_year) ? "match" : props.searchTerm ? "nomatch" : null}`} 
					key={`year${i}${j}`}>
						{years[yearIndex]}
						{ postCount > 0 ? <div className="post-count"> {postCount} <div>&nbsp;posts </div> </div> : null }
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

	let content
	switch(dateUnit) {
		case 0: // Day
			content = getDayElements()
			break;
		case 1: 
			content = getMonthElements()
			break;
		case 2:
			content = getYearElements()
			break;
	}

	return (
		<div className="container-board-calendar-viewer"> 
			<BoardCalendarViewerMenu 
			clickedNextUnit={clickedCalendarMenuNextUnitHandler}
			clickedPrevUnit={clickedCalendarMenuPrevUnitHandler}
			clickedUnit={clickedCalendarMenuUnitHandler}
			dateUnit={dateUnit}/>
			<div className="header">  {months[month].toUpperCase()} {year} </div>
			{content}
		</div>
	)

}

export default BoardCalendarViewer