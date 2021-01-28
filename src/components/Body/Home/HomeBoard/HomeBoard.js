import React, { Component } from 'react'
import './HomeBoard.css'
import {
	Link
} from "react-router-dom";

const HomeBoard = props => {

	return (
		<Link to={`/board/${props.board.id}`} className="container-home-board"> 
			<div className={`visibility ${props.board.public ? "public" : null}`}>
				{props.board.public ? "PUBLIC" : "PRIVATE"}
			</div>
			<div className="name">
				{props.board.name}
			</div>
			<div className="description">
				"{props.board.description.length > 30 ? `${props.board.description.substr(0, 30)}...` : `${props.board.description}`}"
			</div>
		</Link>
	)

}

export default HomeBoard