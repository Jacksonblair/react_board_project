import React, { Component } from 'React'
import './HomeActivity.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const HomeActivity = props => {

	return (
		<div className="container-home-activity"> 
			<div className="header"> Activity </div>
			<div className="item">
				<i className="fas fa-plus-circle"></i> <div className="name"> John </div> added a new <div className="post"> post </div> to <div className="board"> Board </div>
			</div>
			<div className="item">
				<i className="fas fa-plus-circle"></i> <div className="name"> John </div> added a new <div className="post"> post </div> to <div className="board"> Board </div>
			</div>
			<div className="item">
				<i className="fas fa-plus-circle"></i> <div className="name"> John </div> added a new <div className="post"> post </div> to <div className="board"> Board </div>
			</div>
			<div className="item">
				<i className="fas fa-plus-circle"></i> <div className="name"> Dave </div> created a new board: <div className="board"> Board </div>
			</div>
		</div>
	)

}

export default withRouter(HomeActivity)