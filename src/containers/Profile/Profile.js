import React, { Component } from 'react'
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

// Assuming logo.png is in the same folder as JS file
import ResourceWrapper from '../../components/Body/Util/ResourceWrapper/ResourceWrapper.js'
import ProfileEditor from '../../components/Body/Profile/ProfileEditor/ProfileEditor.js'
import EmailEditor from '../../components/Body/Profile/EmailEditor/EmailEditor.js'
import PasswordEditor from '../../components/Body/Profile/PasswordEditor/PasswordEditor.js'

import profileImage from '../../assets/images/profile_picture.png'

class Profile extends Component {

	state = {
		profile: {
			id: null,
			email: null,
			username: null,
			profile_image_url: null,			
		},
		finishedLoading: false,
		readError: "",

		/* Variables for <ProfileEditor>/<EmailEditor>/<PasswordEditor> */
		serverError: "",
		formError: "",
		updateEmailSuccess: "",
		updatePasswordSuccess: "",
		processing: false
	}

	getProfile = (callback) => {
		this.setState({
			finishedLoading: false,
			readError: null
		})

		axios.get(`/profile/${this.props.match.params.userid}`)
		.then((res) => {
			this.setState({
				profile: {
					id: res.data.id,
					username: res.data.username,
					email: res.data.email,
					profile_image_url: res.data.profile_image_url				
				},
				finishedLoading: true
			})
		})
		.catch((err) => {
			this.setState({
				readError: err.response ? err.response.data : "Error",
				finishedLoading: true
			})
		})
	}

	clearErrors = () => {
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	clickedSubmitEditedEmailHandler = (email, confirmEmail) => {
		this.setState({
			processing: true,
		})
		this.clearErrors()

		// TODO: Validate email
		if (email != confirmEmail) {
			this.setState({
				formError: "E-mails do not match",
				processing: false
			})
		} else {
			axios.put('/auth/email', {
				email
			})	
			.then((res) => {
				// Get the profile again
				this.setState({
					processing: false,
					updateEmailSuccess: "Successfully updated email"
				})
			})
			.catch((err) => {
				this.setState({
					serverError: err.response ? err.response.data : "Error",
					processing: false
				})
			})
		}

	}	

	clickedSubmitEditedPasswordHandler = (oldPassword, newPassword, confirmNewPassword) => {
		this.setState({
			processing: true
		})
		this.clearErrors()

		if (newPassword != confirmNewPassword) {
			this.setState({
				formError: "New passwords do not match",
				processing: false
			})
		} else {
			axios.put('/auth/password', {
				oldPassword, newPassword
			})	
			.then((res) => {
				this.setState({
					processing: false,
					updatePasswordSuccess: "Successfully updated password"
				})
			})
			.catch((err) => {
				this.setState({
					serverError: err.response ? err.response.data : "Error",
					processing: false
				})
			})
		}
	}

	render() {
		return (
			<div className="container-profile">

				<ResourceWrapper
				getResourceCondition={"userid"}
				getResource={this.getProfile}
				readError={this.state.readError}
				finishedLoading={this.state.finishedLoading}>
					<div className="body-sub-menu">
						<button className="type-one" onClick={this.props.history.goBack}> Back </button>
					</div>
					<Switch>
						{/*
							<Route exact path={`/profile/:userid/edit/profile`}>
								<ProfileEditor
								clickedSubmit={this.clickedSubmitEditedProfileHandler}
								clearErrors={this.clearErrors}
								serverError={this.state.serverError}
								formError={this.state.formError}
								processing={this.state.processing}
								userid={this.props.match.params.userid}
								profile={this.state.profile}/>
							</Route>
						*/}
						<Route exact path={`/profile/:userid/edit/email`}>
							<EmailEditor
							getProfile={this.getProfile}
							formSuccess={this.state.updateEmailSuccess}
							clickedSubmit={this.clickedSubmitEditedEmailHandler}
							clearErrors={this.clearErrors}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}
							userid={this.props.match.params.userid}
							profile={this.state.profile}/>
						</Route>
						<Route exact path={`/profile/:userid/edit/password`}>
							<PasswordEditor
							getProfile={this.getProfile}
							formSuccess={this.state.updatePasswordSuccess}
							clickedSubmit={this.clickedSubmitEditedPasswordHandler}
							clearErrors={this.clearErrors}
							serverError={this.state.serverError}
							formError={this.state.formError}
							processing={this.state.processing}
							userid={this.props.match.params.userid}
							profile={this.state.profile}/>
						</Route>
						<Route path={`/profile/:userid/`}>
							<div className="profile">
								<div className="profile-image">
									<img src={profileImage}/>
								</div>
								<div className="details">
									<div className="email">
										Email:&nbsp;<div>{this.state.profile.email}</div>
									</div>
									<div className="username">
										Username:&nbsp;<div>{this.state.profile.username}</div>
									</div>									
									<div className="menu">
{/*										<Link to={`/profile/${this.props.match.params.userid}/edit/profile`} className="edit">
											Edit Profile
										</Link>*/}
										<Link to={`/profile/${this.props.match.params.userid}/edit/email`} className="edit type-one">
											Change Email
										</Link>
										<Link to={`/profile/${this.props.match.params.userid}/edit/password`} className="edit type-one">
											Change Password
										</Link>
									</div>
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