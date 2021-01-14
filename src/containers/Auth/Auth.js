import React, { Component } from 'React'
import './Auth.css'
import { connect } from 'react-redux'
import axios from 'axios'
import {
	Switch,
	Route,
	Redirect,
	withRouter
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'

import Login from '../../components/Body/Auth/Login/Login.js'
import Register from '../../components/Body/Auth/Register/Register.js'

class Auth extends Component {

	state = {
		loginEmail: "",
		loginPassword: "",
		registerEmail: "",
		registerPassword: "",
		registerConfirmPassword: "",
		serverError: "",
		formError: "",
		formSuccess: "",
		processing: false
	}

	formErrors = {
		invalidEmail: "Email is not valid"
	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {
		/* If we swap from login to register, or vice versa, clear the error variables in state */
		if (prevProps.history.location != this.props.history.location) {
			this.resetErrors()
		}
	}

	updateLoginPasswordHandler = (password) => {
		this.setState({
			loginPassword: password
		})
	}

	updateLoginEmailHandler = (email) => {
		this.setState({
			loginEmail: email
		})
	}

	updateRegisterEmailHandler = (email) => {
		this.setState({
			registerEmail: email
		})
	}

	updateRegisterPasswordHandler = (password) => {
		this.setState({
			registerPassword: password
		})
	}

	updateRegisterConfirmPasswordHandler = (password) => {
		this.setState({
			registerConfirmPassword: password
		})
	}

	clickedSubmitLoginHandler = () => {
		this.setState({
			processing: true
		})
		this.resetErrors()

		if (this.emailIsValid(this.state.loginEmail)) {
			// TODO: Login to server
			console.log("EMAIL VALID")

			setTimeout(() => {
				this.setState({
					processing: false
				})
			}, 2000)
		} else {
			this.setState({
				formError: this.formErrors.invalidEmail
			})
		}
	} 

	clickedSubmitRegisterHandler = () => {
		this.setState({
			processing: true
		})
		this.resetErrors()
		setTimeout(() => {
			this.setState({
				processing: false,
				formSuccess: "Registered successfully"
			})
		}, 1000)
	}

	emailIsValid = (email) => {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	resetErrors = () => {
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	render() {
		return (
			<div className="container-auth">
				<Switch>
					<Route exact path="/auth/login">
						<Login
						processing={this.state.processing}
						clickedSubmit={this.clickedSubmitLoginHandler}
						updateEmail={this.updateLoginEmailHandler}
						updatePassword={this.updateLoginPasswordHandler}
						formError={this.state.formError}
						serverError={this.state.serverError}/>
					</Route>
					<Route path="/auth/register">
						<Register		
						processing={this.state.processing}
						clickedSubmit={this.clickedSubmitRegisterHandler}
						updateEmail={this.updateRegisterEmailHandler}
						updatePassword={this.updateRegisterPasswordHandler}				
						updateConfirmPassword={this.updateRegisterConfirmPasswordHandler}				
						formError={this.state.formError}
						formSuccess={this.state.formSuccess}
						serverError={this.state.serverError}/>
					</Route>
					<Route>
						<Redirect to="/auth/login"/>
					</Route>
				</Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))