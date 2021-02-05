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
		<Link to={`/board/${props.match.params.boardid}/post/new`} className="type-two new">
			<React.Fragment>
			Add new post&nbsp;<i className="fas fa-plus-circle"></i>
			</React.Fragment>
		</Link>
		: null

	return (
		<div className="container-board-list-viewer"> 
			{newPostButton}
			{content}
		</div>
	)

}

export default withRouter(BoardListViewer)