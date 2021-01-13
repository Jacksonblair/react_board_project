import React, { Component } from 'React'
import './BoardListPost.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const BoardListPost = props => {

	console.log(props)

	return (
		<button 
		className="container-board-list-post" 
		onClick={() => props.history.push(`/board/${props.match.params.boardid}/post/${props.post.id}`)}> 
			<div className="date-column">
				<div className="box">
					<div className="day"> 
						{props.dd}
					</div>
					<div className="month"> 
						{props.monthString.substr(0, 3).toUpperCase()}
					</div>
				</div>
			</div>
			<div className="content-column">
				<div className="title">
					{props.post.title}
				</div>
				<div className="metadata">
					<div className="author">
						Author:&nbsp;<div className="name">Jimmy Neutron</div>
					</div>
					<div className="created">
						Created:&nbsp;<div className="date"> 00/00/0000 </div>
					</div>
				</div>
			</div>
		</button>
	)

}

export default withRouter(BoardListPost)