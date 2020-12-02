import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions.js'
import './CalendarViewer.css'
import CalendarDay from '../../components/body/CalendarDay/CalendarDay'
import CalendarViewerMenu from '../../components/body/CalendarViewerMenu/CalendarViewerMenu'
import EventsViewer from '../../components/body/EventsViewer/EventsViewer'

class CalendarViewer extends Component {

	/* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d */

	state = {
		interfaceToView: 0, /* Calendar, Days Events, Event */
		unitView: 0, /* Days in month, months in year, years in decade? */
		selectedDay: null
	}

	clickedDayHandler = (day) => {
		/* TODO: Get events for that day */
		this.setState({
			selectedDay: day
		})
	}

	updateUnitViewHandler = (view) => {
		this.setState({
			unitView: view
		})
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
		let firstDay = (new Date(this.props.year, this.props.month)).getDay();
		let date = 1

		// For 6 possible rows of calendar
		for (let i = 0; i < 6; i++) {
			let days = []

			for (let j = 0; j < 7; j++) {
				if (i == 0 && j < firstDay) {
					days.push( <CalendarDay day={-1} key={i + j}/> )				
				} else if (date > this.daysInMonth(this.props.month, this.props.year)) {
					if (j < 7) {
						days.push( <CalendarDay day={-1} key={i + j}/> )
					} else {
						break
					}
				} else {
					days.push( <CalendarDay day={date} key={i + j} clicked={(date) => this.clickedDayHandler(date)}/> )
					date++
				}
			}

			calendar.push(
				<div className="calendar-viewer-row" key={"calendar-viewer-row" + i}>
					{days}
				</div>
			)
		}

		return (
			<React.Fragment>
				<div className="container-calendar-viewer">
					<CalendarViewerMenu
					clickedUpdateView={this.updateUnitViewHandler}
					clickedUpdateMonth={this.updateMonthHandler}
					month={this.props.month}
					clickedUpdateYear={this.updateYearHandler}
					year={this.props.year}
					unitView={this.state.unitView}/>
					{calendar}
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		year: state.year,
		month: state.month
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateMonth: (month) => dispatch({ type: actionTypes.MONTH_UPDATE, payload: { month }  }), 
		updateYear: (year) => dispatch({ type: actionTypes.YEAR_UPDATE, payload: { year } }), 
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarViewer)
