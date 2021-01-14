import React, { Component } from 'React'
import './HomeBoard.css'
import {
	Link
} from "react-router-dom";

const HomeBoard = props => {

	return (
		<Link to={`/board/${props.board.id}`} className="container-home-board"> 
			<div className="name">
				{props.board.name}
			</div>
			<div className="description">
				{props.board.description}
			</div>
		</Link>
	)

}

export default HomeBoard