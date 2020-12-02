import React, { Component } from 'React'
import { connect } from 'react-redux'
import './Body.css'
import CalendarViewer from '../CalendarViewer/CalendarViewer.js'

class Body extends Component {

	/*
			Store (day, month)
				 ---|---
			Calendar	List
				|		 |
			Days Events  |
			 	|		 |
			  	 -Event--

	*/

	state = {
		viewType: 0, /* Calendar: 0, List: 1 */
	}
	
	interfaces = [
		<CalendarViewer/>,
		/*
		ListViewer
		EventsOnDayViewer
		EventViewer
		*/
		(<div> LIST INTERFACE </div>),
	]

	clickedBackToCalendarButton = () => {
		this.setState({
			interfaceToView: 0
		})
	}

	render() {
		return (
			<div className="_container-body">
				{this.interfaces[this.state.viewType]}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)