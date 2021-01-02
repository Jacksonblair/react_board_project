import React, { Component } from 'React'
import './HeaderProfileWindow.css'
import {
  Link
} from "react-router-dom";

const HeaderProfileWindow = props => {

	let headerProfileContent = props.authed ? 
		<Link to="/profile" className="header-profile-window">
			<div className="header-profile-window-user-icon-container">
					<div className="header-profile-window-user-icon bg-3"/>
			</div>
			<div className="header-profile-window-user-details color-2">
				<div>
					Firstname
				</div>
			</div>
		</Link>
		: <div className="header-auth-window">
			<Link to="/login" className="header-auth-window-button color-2">
				Log In
			</Link>
			<Link to="/register" className="header-auth-window-button color-2">
				Register
			</Link>
		</div>

	return (
		<React.Fragment>
			{headerProfileContent}
		</React.Fragment>
	)
}

export default HeaderProfileWindow