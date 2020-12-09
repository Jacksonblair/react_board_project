import React, { Component } from 'React'
import './HeaderProfileWindow.css'
import {
  Link
} from "react-router-dom";

const HeaderProfileWindow = props => {
	return (
		<Link to="/profile">
			<div className="header-profile-window">
				<div className="header-profile-window-user-icon-container">
						<div className="header-profile-window-user-icon bg-3"/>
				</div>
				<div className="header-profile-window-user-details color-2">
					<div>
						Firstname
					</div>
				</div>
			</div>
		</Link>
	)
}

export default HeaderProfileWindow