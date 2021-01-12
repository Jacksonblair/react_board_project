import React, { Component } from 'React'
import './BoardMenu.css'

const BoardMenu = props => {

	let state = {

	}

	return (
		<div className="container-board-menu"> 
			<div className="name">
				{props.currentBoard.name}
			</div>
			<div className="description">
				{props.currentBoard.description}
			</div>
			<div className="menu">
				<button className="calendar"> 
					<i className="fas fa-calendar"></i> 
				</button>
				<button className="list"> 
					<i className="fas fa-list"></i>
				</button>
				<input className="search"/>
				<button className="edit">
					<i className="fas fa-cog"></i> 
				</button>
			</div>
		</div>
	)

}

export default BoardMenu