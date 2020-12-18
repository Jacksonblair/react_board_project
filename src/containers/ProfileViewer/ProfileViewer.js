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
				<div className="board-sub-menu bg-1 color-2">
					<div className="board-sub-menu-button" onClick={() => this.props.history.goBack()}> 
						<i className="fas fa-arrow-left"/>&nbsp;Back
					</div>
					<div className="board-sub-menu-button" onClick={this.clickedEditProfileHandler}> 
						{ !this.state.editingProfile ? "Edit Profile" : "Save Changes"}
					</div>
				</div>

				<div className="profile-viewer-header">
					Your Profile
				</div>

				<div className="board-form">
					<div className="board-form-text color-2">
						E-mail:&nbsp;
						{
							this.state.editingProfile ?
							<input defaultValue="email@wot.com"
							className="board-form-input profile-email"/>
							: <input disabled defaultValue="email@wot.com"
							className="board-form-input disabled profile-email"/>
						}
					</div>
				</div>

			</div>
		)
	}
}

export default withRouter(ProfileViewer)