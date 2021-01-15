import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Profile.css'
import {
	withRouter,
	Switch,
	Route,
	Redirect,
	Link
} from "react-router-dom";

import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'
import ProfileEditor from '../../components/Body/Profile/ProfileEditor/ProfileEditor.js'
import EmailEditor from '../../components/Body/Profile/EmailEditor/EmailEditor.js'

class Profile extends Component {

	state = {
		profile: {
			id: 1,
			email: "email@website.com",
			profile_image_url: "",			
		},
		finishedLoading: true,
		readError: "",

		/* Variables for <ProfileEditor>/<EmailEditor>/<PasswordEditor> */
		serverError: "",
		formError: "",
		processing: false
	}

	componentDidMount = () => {
		/*
		When the component mounts, we try to get the contents of the profile
		for the user with the :userid in the url
		*/
		// this.getProfile()
	}

	componentDidUpdate = (prevProps) => {
		// If the userid in the url changes, we need to get a new profile
/*		if (prevProps.match.params.userid != this.props.match.params.userid) {
			this.getProfile()
		}*/
	}

	getProfile = (callback) => {
/*		axios.get(`/profile/${this.props.match.params.userid}`)
		.then((res) => {
			callback ? callback() : null
		})
		.catch((err) => {
			this.setState({
				readError: err.response ? err.response.data : "Error"
			})
		})*/
	}

	clearEditorErrors = () => {
		console.log("Clearing errors")
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitEditedEmailHandler = (email, confirmEmail) => {
		console.log(email, confirmEmail)
	}

	clickedSubmitEditedPasswordHandler = (password, confirmPassword) => {

	}

	render() {
		return (
			<div className="container-profile">
				<ResourceWrapper
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>

					<Switch>
						<Route exact path={`/profile/:userid/edit/profile`}>
							<ProfileEditor
							clearErrors={this.clearEditorErrors}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}
							userid={this.props.match.params.userid}
							profile={this.state.profile}/>
						</Route>
						<Route exact path={`/profile/:userid/edit/email`}>
							<EmailEditor
							clickedSubmit={this.clickedSubmitEditedEmailHandler}
							clearErrors={this.clearEditorErrors}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}
							userid={this.props.match.params.userid}
							profile={this.state.profile}/>
						</Route>
						<Route path={`/profile/:userid/`}>
							<div className="profile-image">
								<img href=""/>
							</div>
							<div className="details">
								<div className="email">
									Email: {this.state.profile.email}
								</div>
								<div className="menu">
									<Link to={`/profile/${this.props.match.params.userid}/edit/profile`} className="edit">
										Edit Profile
									</Link>
									<Link to={`/profile/${this.props.match.params.userid}/edit/email`} className="edit">
										Edit Email
									</Link>
									<Link className="edit">
										Change Password
									</Link>
								</div>
							</div>
						</Route>
						<Route>
							<Redirect to={`profile/${this.props.match.params.userid}`}/>
						</Route>
					</Switch>

				</ResourceWrapper>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))