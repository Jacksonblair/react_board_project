import React, { Component } from 'React'
import './HeaderProfileWindow.css'

const HeaderProfileWindow = props => {
	return (
		<div className="header-profile-window">
			<div className="header-profile-window-user-icon-container">
				<div className="header-profile-window-user-icon"/>
			</div>

			<div className="header-profile-window-user-details">
				profile details
			</div>
		</div>
	)
}

export default HeaderProfileWindow