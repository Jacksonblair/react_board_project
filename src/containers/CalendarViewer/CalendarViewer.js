import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions.js'
import './CalendarViewer.css'
import CalendarDay from '../../components/body/CalendarDay/CalendarDay'
import CalendarMonth from '../../components/body/CalendarMonth/CalendarMonth'
import CalendarYear from '../../components/body/CalendarYear/CalendarYear'
import CalendarViewerMenu from '../../components/body/CalendarViewerMenu/CalendarViewerMenu'
import EventsViewer from '../../components/body/EventsViewer/EventsViewer'

class CalendarViewer extends Component {

	/* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d */

	state = {
		interfaceToView: 0, /* Calendar, Days Events, Event */
		hidingcalendarUnit: false, /* animation flags for changing unit view */
		showingcalendarUnit: false,
		selectedDay: null
	}

	years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2028, 2029]
	months = ["JAN", "FED", "MAR", "APR", 
	"MAY", "JUN", "JUL", "AUG", 
	"SEP", "OCT", "NOV", "DEC"]

	clickedDayHandler = (day) => {
		/* TODO: Get events for that day */
		this.setState({
			selectedDay: day
		})
	}

	clickedMonthHandler = (month) => {
		this.props.updateMonth(month)
		this.updateCalendarUnitHandler(0)
	}

	clickedYearHandler = (year) => {
		this.props.updateYear(year)
		this.props.updateMonth(0) // Set month to january when selecting a year
		this.updateCalendarUnitHandler(1)
	}

	updateCalendarUnitHandler = (unit) => {
		if (this.props.calendarUnit != unit) {
			this.setState({
				hidingcalendarUnit: true
			})	
			setTimeout(() => {
				this.setState({
					hidingcalendarUnit: false,
					showingcalendarUnit: true
				})		
				this.props.updateCalendarUnit(unit)
				setTimeout(() => {
					this.setState({
						showingcalendarUnit: false
					})
				}, 100)
			}, 100)			
		}
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
		this.props.updateYear(year)
	}

	daysInMonth = (month, year) => { 
	    return 32 - new Date(year, month, 32).getDate()
	}

	render() {
		
		let calendar = []

		/* Generate units to show based on props.calendarUnit */
		if (this.props.calendarUnit == 0) { // Viewing days in a month
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
							day={day} 
							key={`day${i}${j}`} 
							clicked={this.clickedDayHandler}/> )
						day++
					}
				}

				calendar.push(
					<div className="calendar-viewer-row day" key={"calendar-viewer-row-" + i}>
						{days}
					</div>
				)
			}
		} else if (this.props.calendarUnit == 1) { // Viewing months in a year
			let month = 0
			// For 3 rows of months
			for (let i = 0; i < 3; i++) {
				let months = []

				// For 4 months in a row
				for (let j = 0; j < 4; j++) {
					months.push(
						<CalendarMonth 
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
		} else if (this.props.calendarUnit == 2) { // Viewing years in some range
			let year = 0;
			// For 3 months of years
			for (let i = 0; i < 3; i++) {
				let years = []

				// For 4 years in a row
				for (let j = 0; j < 3; j++) {
					years.push(
						<CalendarYear
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
		}

		let calendarWrapperStyle = 
			`visibility-wrapper ${this.state.hidingcalendarUnit ? "hiding" : ""}${this.state.showingcalendarUnit ? "showing" : ""}`

		return (
			<React.Fragment>
				<div className="container-calendar-viewer">
					<CalendarViewerMenu
					clickedUpdateCalendarUnit={this.updateCalendarUnitHandler}
					clickedUpdateMonth={this.updateMonthHandler}
					currentMonth={this.props.month}
					months={this.months}
					clickedUpdateYear={this.updateYearHandler}
					currentYear={this.props.year}
					years={this.years}
					calendarUnit={this.props.calendarUnit}/>
					<div className={calendarWrapperStyle}>
						{calendar}
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		year: state.year,
		month: state.month,
		calendarUnit: state.calendarUnit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateMonth: (month) => dispatch({ type: actionTypes.MONTH_UPDATE, payload: { month }  }), 
		updateYear: (year) => dispatch({ type: actionTypes.YEAR_UPDATE, payload: { year } }), 
		updateCalendarUnit: (unit) => dispatch({ type: actionTypes.CALENDAR_UNIT_UPDATE, payload: { unit } }), 
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarViewer)
