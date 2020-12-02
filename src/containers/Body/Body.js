import React, { Component } from 'React'
import { connect } from 'react-redux'
import './Body.css'
import BodyMenu from '../../components/Body/BodyMenu/BodyMenu.js'
import CalendarViewer from '../CalendarViewer/CalendarViewer.js'
import ListViewer from '../ListViewer/ListViewer.js'

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
		viewType: 0, /* Calendar Viewer: 0, List Viewer: 1 */
		hidingViewer: false,
		showingViewer: false
	}
	
	interfaces = [
		<CalendarViewer/>,
		<ListViewer/>,
	]

	updateViewTypeHandler = (viewType) => {
		if (viewType !== this.state.viewType) {

			this.setState({
				hidingViewer: true
			})
			setTimeout(() => {
				this.setState({
					viewType: viewType,
					hidingViewer: false,
					showingViewer: true
				})						
				setTimeout(() => {
					this.setState({
						showingViewer: false
					})
				}, 100)	
			}, 100)

		}
	}

	render() {
		let viewerWrapperStyle = 
			`visibility-wrapper ${this.state.hidingViewer ? "hiding" : ""}${this.state.showingViewer ? "showing" : ""}`

		return (
			<div className="_container-body">
				<div className="_container-center-column">
					<BodyMenu clickedUpdateViewType={this.updateViewTypeHandler}/>
					<div className={viewerWrapperStyle}>
						{this.interfaces[this.state.viewType]}
					</div>
				</div>
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