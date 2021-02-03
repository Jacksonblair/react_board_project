import React, { Component } from 'react'
import './BoardListViewer.css'
import {
	Link,
	withRouter
} from 'react-router-dom'

import BoardListPost from '../BoardListPost/BoardListPost.js'

const BoardListViewer = props => {

	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	let prevYear

	let content = props.posts ? 
	props.posts.map((post, i) => {
		let [ dd, mm, yyyy ] = post.target_date.split('/')

		if (yyyy != prevYear) {
			prevYear = yyyy
			return (
				<React.Fragment key={`Fragment${yyyy}`}>
				<div key={`BoardListYear${yyyy}`} className="year">
					{yyyy}
				</div>
				<BoardListPost 
				key={`BoardListPost${i}`} 
				post={post} 
				dd={dd} 
				mm={mm}
				monthString={months[mm - 1]} 
				yyyy={yyyy}/>
				</React.Fragment>
			)		
		} else {
			return (
				<BoardListPost 
				key={`BoardListPost${i}`} 
				post={post} 
				dd={dd} 
				mm={mm}
				monthString={months[mm - 1]} 
				yyyy={yyyy}/>
			)			
		}
	})
	: null

	let newPostButton = (props.userDetails.user_id == props.currentBoard.created_by_user_id) ?
		<Link to={`/board/${props.match.params.boardid}/post/new`} className="new">
			{ props.posts.length ? 
			<React.Fragment>
			Add new post&nbsp;<i className="fas fa-plus-circle"></i>
			</React.Fragment>
			: <React.Fragment>
			Add a first post!&nbsp;<i className="fas fa-plus-circle"></i>
			</React.Fragment> }
		</Link>
		: null

	let dateRangeHeader = props.startDate || props.endDate ?
		<div className="date-range">
			Date Range: 
			{ props.startDate ? 
				<div> From: {props.startDate.toLocaleDateString("EN-au")} </div>
				: <div> From: ~ </div>
			}			
			{ props.endDate ? 
				<div> To: {props.endDate.toLocaleDateString("EN-au")} </div>
				: <div> To: ~ </div>
			}
		</div>
		: null

	return (
		<div className="container-board-list-viewer"> 
			{dateRangeHeader}
			{content}
			{newPostButton}
		</div>
	)

}

export default withRouter(BoardListViewer)