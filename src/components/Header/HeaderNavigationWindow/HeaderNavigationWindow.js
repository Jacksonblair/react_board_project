import React, { Component  } from 'react'
import {
  Link
} from "react-router-dom";
import './HeaderNavigationWindow.css'

const HeaderNavigationWindow = props => {

	let boardOptions = props.boards.map((board, i) => {
		return (
			<div 
			className="board-address-option color-2" 
			value={board.id} 
			key={`board-option-${i}`}
			onClick={() => props.clickedBoardOption(board.id)}>
				{board.name}
			</div>
		)
	})

	return (
		<div className="header-navigation-window">

			<Link to="/home" className="header-navigation-window-button bg-1">
				<i className="fas fa-home color-2"></i>
			</Link>

			<div className="header-navigation-address-dropdown">

				<div className="board-address-current-board color-2">
					<div className="current-board-name">
						{props.boardToView.name ? `#${props.boardToView.name.substr(0, 10)}...` : "Select a board"}
					</div> 
					&nbsp;<i className="fas fa-chevron-down color-4"></i>
				</div>

				<div className={`board-address-options bg-1`}>
					{boardOptions}
				</div>

			</div>

		</div>
	)
}


export default HeaderNavigationWindow