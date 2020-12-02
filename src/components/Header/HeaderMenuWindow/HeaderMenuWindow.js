import React, { Component } from 'React'
import './HeaderMenuWindow.css'

const HeaderMenuWindow = props => {
	return (
		<div className="header-menu-window">
			<button className="header-menu-window-menu-button" onClick={props.clickedMenu}>
				menu
			</button>
		</div>
	)
}

export default HeaderMenuWindow