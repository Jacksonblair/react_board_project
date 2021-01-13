import React, { Component } from 'React'
import './BoardCalendarViewer.css'

import BoardCalendarViewerMenu from '../BoardCalendarViewerMenu/BoardCalendarViewerMenu.js'
import FuzzySearch from 'fuzzy-search'
import { AnimatePresence, motion } from "framer-motion"

/* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d */

const BoardCalendarViewer = props => {

	let _years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
	let _months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	let calendarUnitEnum = {
		DAY: 0,
		MONTH: 1,
		YEAR: 2
	}

	let dateSelectionTypeText = [
		null, 
		( <div><i className="fas fa-times"></i> Getting range start</div> ), 
		( <div><i className="fas fa-times"></i> Getting range end</div> ),
		( <div><i className="fas fa-times"></i> Setting post target date</div>),
		( <div><i className="fas fa-times"></i> Setting edited target date</div>),
	]

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
		if (this.props.searchTerm) {
			let dates = this.getFilteredDates()
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
		if (this.props.searchTerm) {
			let dates = this.getFilteredDates()
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
		if (this.props.searchTerm) {
			let dates = this.getFilteredDates()
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

		let firstDay = (new Date(props.calendar.year, props.calendar.month)).getDay();
		let day = 1
		// For 6 possible rows of calendar
		for (let i = 0; i < 6; i++) {
			let dayElements = []
			// For 7 possible days in a week
			for (let j = 0; j < 7; j++) {
				/* If not in possible days for this month */
				if (i == 0 && j < firstDay) {
					dayElements.push( 
						<div className="day" key={`day${i}${j}`}>
							{-1}	
						</div>
					)			
				/* If not in possible days for this month */
				} else if (day > daysInMonth(props.calendar.month, props.calendar.year)) {
					if (j < 7) {
						dayElements.push( 
							<div className="day" key={`day${i}${j}`}>
								{-1}	
							</div>
						)
					} else {
						break
					}
				} else {
					dayElements.push( 
						<div className="day" key={`day${i}${j}`}>
							{day}
						</div>
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
		let months = []

		let month = 0
		// For 3 rows of months
		for (let i = 0; i < 3; i++) {
			let monthElements = []

			// For 4 months in a row
			for (let j = 0; j < 4; j++) {
				monthElements.push(
					<div className="month" key={`month${i}${j}`}>
						{_months[month]}
					</div>
				)
				month++
			}

			months.push(
				<div className="row" key={`monthsRow${i}`}> 
					{monthElements}
				</div>
			)
		}

		return (
			<div className="months">
				{months}
			</div>
		)
	}

	let getYearElements = () => {
		let years = []

		let year = 0;
		// For 3 rows of years
		for (let i = 0; i < 3; i++) {
			let yearElements = []

			// For 4 years in a row
			for (let j = 0; j < 3; j++) {
				yearElements.push(
					<div className="year" key={`year${i}${j}`}>
						{_years[year]}
					</div>
				) 
				year++
			}

			years.push(
				<div className="row" key={`yearsRow${i}`}> 
					{yearElements}
				</div>
			)
		}

		return (
			<div className="years">
				{years}
			</div>
		)
	}

	let content
	switch(props.calendar.unit) {
		case calendarUnitEnum.DAY: // Day
			content = (
				<motion.div className="motion-div" transition={{ duration: 0.1 }} key="BoardCalendarViewerMotionDivDays" initial="initial" animate="in" exit="out" variants={props.pageVariants}>
					{ getDayElements() }
				</motion.div>
			)
			break;
		case calendarUnitEnum.MONTH: 
			content = (
				<motion.div className="motion-div" transition={{ duration: 0.1 }} key="BoardCalendarViewerMotionDivMonths" initial="initial" animate="in" exit="out" variants={props.pageVariants}>
					{ getMonthElements() }
				</motion.div>
			)
			break;
		case calendarUnitEnum.YEAR:
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
			updateCalendarMonth={props.updateCalendarMonth}
			updateCalendarYear={props.updateCalendarYear}
			updateCalendarUnit={props.updateCalendarUnit}
			calendarUnitEnum={calendarUnitEnum}
			calendar={props.calendar}/>
			<div> {props.calendar.year} {props.calendar.month} {props.calendar.day} </div>
			<AnimatePresence exitBeforeEnter>
				{content}
			</AnimatePresence>
		</div>
	)

}

export default BoardCalendarViewer