import React, { Component } from 'React'
import './HeaderMenuWindow.css'

const HeaderMenuWindow = props => {
	return (
		<div className="header-menu-window">
			<div className="header-menu-window-menu-button" onClick={props.clickedMenu}>
				<div className="window-menu-button-bar bg-2"/>
				<div className="window-menu-button-bar bg-2"/>
				<div className="window-menu-button-bar bg-2"/>
			</div>
		</div>
	)
}

export default HeaderMenuWindow