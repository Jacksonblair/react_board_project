import React, { Component } from 'React'
import './BoardListViewer.css'
import {
	Link,
	withRouter
} from 'react-router-dom'

import BoardListPost from '../BoardListPost/BoardListPost.js'

const BoardListViewer = props => {

	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

	let content = props.posts ? 
	props.posts.map((post, i) => {
		let [ dd, mm, yyyy ] = post.target_date.split('/')
		return (
			<BoardListPost 
			key={`BoardListPost${i}`} 
			post={post} 
			dd={dd} 
			mm={mm}
			monthString={months[mm - 1]} 
			yyyy={yyyy}/>
		)
	})
	: null

	return (
		<div className="container-board-list-viewer"> 
			{content}
			<Link to={`/board/${props.match.params.boardid}/post/new`} className="new">
				{ props.posts.length ? 
					<React.Fragment>
					Add new post&nbsp;<i className="fas fa-plus-circle"></i>
					</React.Fragment>
				:  <React.Fragment>
					Add a first post!&nbsp;<i className="fas fa-plus-circle"></i>
					</React.Fragment> 
				}
			</Link>
		</div>
	)

}

export default withRouter(BoardListViewer)