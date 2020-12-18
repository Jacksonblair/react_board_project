import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions.js'
import './CalendarViewer.css'
import FuzzySearch from 'fuzzy-search'
import {
	Switch,
	Route,
	withRouter,
	Redirect,
	Link
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion"

import CalendarDay from '../../../components/body/CalendarDay/CalendarDay'
import CalendarMonth from '../../../components/body/CalendarMonth/CalendarMonth'
import CalendarYear from '../../../components/body/CalendarYear/CalendarYear'
import CalendarViewerMenu from '../../../components/body/CalendarViewerMenu/CalendarViewerMenu'
import EventsViewer from '../../../components/body/EventsViewer/EventsViewer'
import CSSTransition from '../../Util/CSSTransition/CSSTransition'

class CalendarViewer extends Component {

	/* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d */

	state = {

	}

	years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
	months = ["January", "February", "March", "April", 
	"May", "June", "July", "August", 
	"September", "October", "November", "December"]
	dateRangeTypeText = [
		null, 
		( <div><i className="fas fa-times"></i> Getting range start</div> ), 
		( <div><i className="fas fa-times"></i> Getting range end</div> )
	]

	clickedDayHandler = (day) => {

		this.props.updateRangeType(0)

		/* 
			When we click a day directly
			It moves to the List Viewer
			And sets the range, depending on props.dateRangeType

			If it's 0 (On), that means we set rangeStart and rangeEnd to the day.
			If it's 1 (Before), we set the rangeStart to the day
			If it's 2, (After), we set the rangeEnd to the day
		*/

		let rangeValue = new Date(this.props.year, this.props.month, day)

		switch(this.props.dateRangeType) {
			case 0:
				this.props.updateRangeStart(rangeValue)
				this.props.updateRangeEnd(rangeValue)
				break;
			case 1:
				this.props.updateRangeStart(rangeValue)
				break;
			case 2:
				this.props.updateRangeEnd(rangeValue)
				break;
		}
	}

	clickedMonthHandler = (month) => {
		this.props.updateMonth(month)
		this.props.updateCalendarUnit(0)
	}

	clickedYearHandler = (yearIndex) => {
		this.props.updateYear(this.years[yearIndex])
		this.props.updateMonth(0) // Set month to january when selecting a year
		this.props.updateCalendarUnit(1)
	}

	updateMonthHandler = (month) => {
		if (month < 0) {
			this.props.updateMonth(11)
			this.props.updateYear(this.props.year - 1)
		} else if (month > 11) {
			this.props.updateMonth(0)
			this.props.updateYear(this.props.year + 1)
		} else {
			this.props.updateMonth(month)
		}
	}

	updateYearHandler = (year) => {
		if (year <= this.years[this.years.length - 1] && year >= this.years[0]) {
			this.props.updateYear(year)
		}
	}

	daysInMonth = (month, year) => { 
	    return 32 - new Date(year, month, 32).getDate()
	}

	getFilteredDates = () => {
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

	/*TODO: Can i repeat less for these functions? */

	getDayMatch = (day, month, year) => {
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

	getMonthMatch = (month, year) => {
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

	getYearMatch = (year) => {
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

	getDayElements = () => {
		let calendar = []

		calendar.push(
			<div key="calendar-date-header" className="calendar-viewer-header-date color-2">
				{`${this.months[this.props.month]} ${this.props.year}`}
			</div>
		)

		let firstDay = (new Date(this.props.year, this.props.month)).getDay();
		let day = 1
		// For 6 possible rows of calendar
		for (let i = 0; i < 6; i++) {
			let days = []
			// For 7 possible days in a week
			for (let j = 0; j < 7; j++) {
				if (i == 0 && j < firstDay) {
					days.push( 
						<CalendarDay 
						day={-1} 
						key={`day${i}${j}`} /> 
					)				
				} else if (day > this.daysInMonth(this.props.month, this.props.year)) {
					if (j < 7) {
						days.push( 
							<CalendarDay 
							day={-1} 
							key={`day${i}${j}`} /> 
						)
					} else {
						break
					}
				} else {
					days.push( 
						<CalendarDay 
						matchesSearchTerm={this.getDayMatch(day, this.props.month, this.props.year)}
						day={day} 
						key={`day${i}${j}`} 
						clicked={this.clickedDayHandler}/>)
					day++
				}
			}

			calendar.push(
				<div className="calendar-viewer-row day" key={"calendar-viewer-row-" + i}>
					{days}
				</div>
			)
		}
	
		return (
			<div>
			{calendar}
			</div>
		)
	}

	getMonthElements = () => {
		let calendar = []

		calendar.push(
			<div key="calendar-date-header" className="calendar-viewer-header-date color-2">
				{this.props.year}
			</div>
		)

		let month = 0
		// For 3 rows of months
		for (let i = 0; i < 3; i++) {
			let months = []

			// For 4 months in a row
			for (let j = 0; j < 4; j++) {
				months.push(
					<CalendarMonth 
						matchesSearchTerm={this.getMonthMatch(month, this.props.year)}
						month={month}
						months={this.months}
						key={`month${month}`}
						clicked={this.clickedMonthHandler}/>
				)
				month++
			}

			calendar.push(
				<div className="calendar-viewer-row month" key={"calendar-viewer-row-" + i}> 
					{months}
				</div>
			)
		}

		return (
			<div>
			{calendar}
			</div>
		)
	}

	getYearElements = () => {
		let calendar = []
		calendar.push(
			<div key="calendar-date-header" className="calendar-viewer-header-date color-2">
			</div>
		)
		let year = 0;
		// For 3 months of years
		for (let i = 0; i < 3; i++) {
			let years = []

			// For 4 years in a row
			for (let j = 0; j < 3; j++) {
				years.push(
					<CalendarYear
						matchesSearchTerm={this.getYearMatch(this.years[year])}
						year={year}
						years={this.years}
						key={`year${year}`}
						clicked={this.clickedYearHandler}/>
					)
				year++
			}

			calendar.push(
				<div className="calendar-viewer-row year" key={"calendar-viewer-row-" + i}> 
					{years}
				</div>
			)
		}

		return (
			<div>
			{calendar}
			</div>
		)
	}

	render() {

		let calendarUnits
		switch(this.props.calendarUnit) {
			case 0: // Day
				calendarUnits = (
					<motion.div transition={{ duration: 0.1 }} key="calendar-unit-days" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
					{this.getDayElements()}
					</motion.div>
				)
				break;
			case 1: 
				calendarUnits = (
					<motion.div transition={{ duration: 0.1 }} key="calendar-unit-months" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
					{this.getMonthElements()}
					</motion.div>
				)
				break;
			case 2:
				calendarUnits = (
					<motion.div transition={{ duration: 0.1 }} key="calendar-unit-years" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
					{this.getYearElements()}
					</motion.div>
				)
				break;
		}

		let rangeSelectionNotifier = this.props.dateRangeType ? 
		(
			<div 
			className="calendar-viewer-date-range-text bg-3 color-2" 
			key="date-range-text"
			onClick={() => this.props.updateRangeType(0)}>
				{this.dateRangeTypeText[this.props.dateRangeType]}
			</div>
		) : null

		return (
			<React.Fragment>
				<div className="container-calendar-viewer">
					<CalendarViewerMenu
					updateCalendarUnit={this.props.updateCalendarUnit}
					searchTerm={this.props.searchTerm}
					updateSearchTerm={this.props.updateSearchTerm}
					dateRangeType={this.props.dateRangeType}
					clickedUpdateMonth={this.updateMonthHandler}
					currentMonth={this.props.month}
					months={this.months}
					clickedUpdateYear={this.updateYearHandler}
					currentYear={this.props.year}
					years={this.years}
					calendarUnit={this.props.calendarUnit}/>
					{rangeSelectionNotifier}
					<AnimatePresence exitBeforeEnter>
						{calendarUnits}
					</AnimatePresence>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		year: state.year,
		month: state.month,
		dateRangeType: state.dateRangeType,
		searchTerm: state.searchTerm,
		posts: state.posts,
		pageVariants: state.pageVariants,
		calendarUnit: state.calendarUnit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateRangeType: (rangeType) => dispatch({ type: actionTypes.DATE_RANGE_TYPE_UPDATE, payload: { rangeType: rangeType }  }), 
		updateCalendarUnit: (unit) => dispatch({ type: actionTypes.CALENDAR_UNIT_UPDATE, payload: { unit: unit }}),
		updateSearchTerm: (searchTerm) => dispatch({ type: actionTypes.SEARCH_TERM_UPDATE, payload: { searchTerm: searchTerm }}),
		updateMonth: (month) => dispatch({ type: actionTypes.MONTH_UPDATE, payload: { month }  }), 
		updateYear: (year) => dispatch({ type: actionTypes.YEAR_UPDATE, payload: { year } }), 
		updateRangeStart: (rangeStart) => dispatch({ type: actionTypes.RANGE_START_UPDATE, payload: { rangeStart: rangeStart }  }), 
		updateRangeEnd: (rangeEnd) => dispatch({ type: actionTypes.RANGE_END_UPDATE, payload: { rangeEnd: rangeEnd } }), 
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarViewer))
