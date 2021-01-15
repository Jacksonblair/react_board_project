import React, { Component } from 'React'
import './BoardListViewer.css'
import {
	Link,
	withRouter
} from 'react-router-dom'

import BoardListPost from '../BoardListPost/BoardListPost.js'

const BoardListViewer = props => {

	let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

	let content = props.currentBoard.posts.map((post, i) => {
		let [ dd, mm, yyyy ] = post.target_date.toLocaleDateString("EN-au").split('/')
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

	return (
		<div className="container-board-list-viewer"> 
			<Link to={`/board/${props.match.params.boardid}/post/new`} className="new">
				Add new Post
			</Link>
			{content}
		</div>
	)

}

export default withRouter(BoardListViewer)