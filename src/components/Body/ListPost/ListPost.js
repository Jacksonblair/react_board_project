import React, { Component } from 'React'
import './ListPost.css'

const ListPost = props => {

	let months = ["JAN", "FEB", "MAR", "APR", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
	let [dd, mm, yyyy] = props.post.date.split('/')

	return (
		<div className="list-post-container" onClick={props.clicked}>
			<div className="list-post-date-container bg-5">
				<div className="list-post-date-day color-1"> {dd} </div>
				<div className="list-post-date-month color-1"> {months[parseInt(mm) - 1]} </div>
			</div>
			<div className="list-post-content-container bg-1">
				<div className="list-post-title color-6"> {props.post.title} </div>
				<div className="list-post-content color-2"> {props.post.content} </div>
				<div className="list-post-author color-5"> 
					<div className="color-2">
						Posted by:&nbsp;
					</div>
					Dave 
				</div>
			</div>

		</div>
	)
}

export default ListPost