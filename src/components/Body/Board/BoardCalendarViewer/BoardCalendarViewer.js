import React, { Component, useState } from 'react'
import './BoardCalendarViewer.css'

import BoardCalendarViewerMenu from '../BoardCalendarViewerMenu/BoardCalendarViewerMenu.js'
import FuzzySearch from 'fuzzy-search'
import { AnimatePresence, motion } from "framer-motion"

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

	let clickedNextMonth = () => {
		if (month == 11) {
			setYear(year + 1)
			setMonth(0)
		} else {
			setMonth(month + 1)
		}
	}

	let clickedPrevMonth = () => {
		if (month == 0) {
			setYear(year - 1)
			setMonth(11)
		} else {
			setMonth(month - 1)
		}
	}

	let clickedPrevYear = () => {
		setYear(year - 1)
	}

	let clickedNextYear = () => {
		setYear(year + 1)
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

	let getFilteredDates = () => {
		/* Filter by fuzzysearch */

		/*
			Here we filter through posts using the search term, to get..
			.. dates which match the terms, so we can highlight them..
			.. on the calendar view.
		*/

		const searcher = new FuzzySearch(this.props.posts, ['title', 'content'], {
			caseSensitive: false,
		});

		let posts = searcher.search(this.props.searchTerm);

		return posts.map((post) => post.date.split("/"))
	}

	let getDayMatch = (day, month, year) => {
		let match = false
		if (props.searchTerm) {
			let dates = getFilteredDates()
			dates.forEach((date) => {
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
			let dates = getFilteredDates()
			dates.forEach((date) => {
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
			let dates = getFilteredDates()
			dates.forEach((date) => {
				if (date[2] == year) {
					match = true
				}
			})
		}
		return match
	}

	let getDayElements = () => {
		let days = []

		let firstDay = (new Date(props.year, props.month)).getDay();
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
					dayElements.push( 
						<button onClick={() => props.clickedDay(_day, month, year)} className="day" key={`day${i}${j}`}>
							{day}
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
				monthElements.push(
					<button onClick={() => clickedMonth(_monthIndex) } className="month" key={`month${i}${j}`}>
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

	let getYearElements = () => {
		let _years = []

		let yearIndex = 0;
		// For 3 rows of years
		for (let i = 0; i < 3; i++) {
			let yearElements = []

			// For 4 years in a row
			for (let j = 0; j < 3; j++) {
				let _year = years[yearIndex]
				yearElements.push(
					<button onClick={() => clickedYear(_year)} className="year" key={`year${i}${j}`}>
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

	let content
	switch(dateUnit) {
		case 0: // Day
			content = (
				<motion.div className="motion-div" transition={{ duration: 0.1 }} key="BoardCalendarViewerMotionDivDays" initial="initial" animate="in" exit="out" variants={props.pageVariants}>
					{ getDayElements() }
				</motion.div>
			)
			break;
		case 1: 
			content = (
				<motion.div className="motion-div" transition={{ duration: 0.1 }} key="BoardCalendarViewerMotionDivMonths" initial="initial" animate="in" exit="out" variants={props.pageVariants}>
					{ getMonthElements() }
				</motion.div>
			)
			break;
		case 2:
			content = (
				<motion.div transition={{ duration: 0.1 }} key="BoardCalendarViewerMotionDivYears" initial="initial" animate="in" exit="out" variants={props.pageVariants}>
					{ getYearElements() }
				</motion.div>
			)
			break;
	}

	return (
		<div className="container-board-calendar-viewer"> 
			<BoardCalendarViewerMenu 
			clickedNextMonth={clickedNextMonth}
			clickedNextYear={clickedNextYear}
			clickedPrevMonth={clickedPrevMonth}
			clickedPrevYear={clickedPrevYear}
			updateDateUnit={(unit) => setDateUnit(unit)}
			month={month}
			year={year}
			dateUnit={dateUnit}/>
			<div className="header">  {months[month].toUpperCase()} {year} </div>
			<AnimatePresence exitBeforeEnter>
				{content}
			</AnimatePresence>
		</div>
	)

}

export default BoardCalendarViewer