import React, { Component } from 'React'
import './HeaderLogoWindow.css'

const HeaderLogoWindow = props => {
	return (
		<div className="header-logo-window">
			<a href="/" className="header-logo-link-wrapper">
				<div className="header-logo-window-logo-icon-container">
					<div className="header-logo-window-logo-icon"/>
				</div>
				<div className="header-logo-window-logo-text">
					logo
				</div>
			</a>
		</div>
	)
}

export default HeaderLogoWindow