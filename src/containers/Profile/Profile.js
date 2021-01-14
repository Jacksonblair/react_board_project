import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Profile.css'
import {
	withRouter,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import ProfileEditor from '../../components/Body/Profile/ProfileEditor/ProfileEditor.js'

class Profile extends Component {

	state = {
		profile: {
			id: 1,
			email: "email@website.com",
			profile_image_url: "",			
		},
		finishedLoading: true,
		readError: "",

		/* Variables for <ProfileEditor> */
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

	render() {
		let content
		if (this.state.readError) {
			content = (
				<div className="read-error"> {this.state.readError} <i className="fas fa-exclamation"></i> </div>
			)
		} else if (!this.state.finishedLoading) {
			content = (
				<div className="loading-message"> <i className="fas fa-asterisk"></i> </div>
			)
		} else {
			content = (
				<Switch>
					<Route exact path={`/profile/:userid/edit`}>
						<ProfileEditor
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
								<button className="edit">
									Edit Profile
								</button>
								<button className="edit">
									Change Password
								</button>
							</div>
						</div>
					</Route>
					<Route>
						<Redirect to={`profile/${this.props.match.params.userid}`}/>
					</Route>
				</Switch>
			)
		}

		return (
			<div className="container-profile">
				{content}
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