import React, { Component } from 'React'
import {
  Link
} from "react-router-dom";
import './HeaderNavigationWindow.css'

const HeaderNavigationWindow = props => {

	let boardOptions = props.boards.map((board, i) => {
		return (
			<div className="board-address-option" value={board.id} key={`board-option-${i}`}>
				{board.name}
			</div>
		)
	})

	return (
		<div className="header-navigation-window">
			<Link to="/home">
				<div className="header-navigation-window-button home bg-1">
					<i className="fas fa-home color-2"></i>
				</div>
			</Link>
			<div className="header-navigation-window-button address color-2">
				{boardOptions}
				{props.boardToView.name ? "#" + props.boardToView.name : "Select a board"}
				&nbsp;<i className="fas fa-chevron-down color-4"></i>
			</div>
		</div>
	)
}

/*onChange={() => props.clickedBoardOption(event.target.value)} */

export default HeaderNavigationWindow