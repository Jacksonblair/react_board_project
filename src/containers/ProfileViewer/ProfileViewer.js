import React, { Component } from 'React'
import './ProfileViewer.css'
import {
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";

class ProfileViewer extends Component {

	/* TODO 
	- Store last viewer that was visible, so when we click the
	BACK button it goes to that view.

	*/

	state = {
		editingProfile: false
	}

	clickedEditProfileHandler = () => {
		this.setState({
			editingProfile: !this.state.editingProfile
		})
	}

	render() {

		return (
			<div className="container-profile-viewer">
				<button className="exit-profile-button"onClick={() => this.props.history.goBack()}> 
					BACK 
				</button>
				PROFILE VIEWER
				{ 
					!this.state.editingProfile ? 
					<button className="edit-profile-button" onClick={this.clickedEditProfileHandler}>
						EDIT PROFILE
					</button>
					: <button className="edit-profile-button" onClick={this.clickedEditProfileHandler}>
						SAVE CHANGES
					</button>
				}

				<div className="profile-viewer-field-container"> 
					<div className="profile-viewer-field-name">
						E-MAIL
					</div>
					<div className="profile-viewer-field-content">
						{ this.state.editingProfile ? 
							<input value="email.wot@website.com"/>
							: <div>email.wot@website.com</div>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(ProfileViewer)