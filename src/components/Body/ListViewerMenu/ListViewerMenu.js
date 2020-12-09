import React, { Component } from 'React'
import './ListViewerMenu.css'
import {
	Link,
	withRouter
} from "react-router-dom";


const ListViewerMenu = props => {

	let startRangeDate;
	let endRangeDate;
	let dateRanges = [startRangeDate, endRangeDate]

	for (let i = 0; i < 2; i++) {
		if (props.dateRanges[i]) {

			let dd;
			let mm;
			let yyyy;

			dd = props.dateRanges[i].getDate()
			mm = props.dateRanges[i].getMonth() + 1
			yyyy = props.dateRanges[i].getFullYear()

			if (dd < 10) {
				dd = `0${dd}`
			}

			if (mm < 10) {
				mm = `0${mm}`
			}

			dateRanges[i] = `${dd}/${mm}/${yyyy}`
		} else {
			dateRanges[i] = `~`
		}
	}
/*
	dateRangesProp.forEach((date, i) => {
		console.log(date)

		let dd;
		let mm;
		let yyyy;

		if (date) {
			dd = date.getDate()
			mm = date.getMonth() + 1
			yyyy = date.getFullYear()

			if (dd < 10) {
				dd = `0${dd}`
			}

			if (mm < 10) {
				mm = `0${mm}`
			}

			dateRanges[i] = `${dd}/${mm}/${yyyy}`
		} else {
			dateRanges[i] = "~"
		}
	})
*/

	return (

		<div className="container-list-viewer-menu bg-1">

			<div className="view-filter-group">
				<Link to={`/board/${props.match.params.boardid}/calendar`}>
					<div className="board-sub-menu-button list color-2" onClick={props.clickedUpdateStartDate}>
						From: {dateRanges[0]}
					</div>
				</Link>
				<Link to={`/board/${props.match.params.boardid}/calendar`}>
					<div className="board-sub-menu-button list color-2" onClick={props.clickedUpdateEndDate}>
						To: {dateRanges[1]}
					</div>
				</Link>
			</div>			

			<div className="view-filter-group">
				<div className="board-sub-menu-button list clear-range color-2" onClick={props.clickedClearFilter}>
					Clear Range &nbsp;<i className="fas fa-times"></i>
				</div>
			</div>			

		</div>
	)
}

export default withRouter(ListViewerMenu)