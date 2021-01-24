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

	authErrors = {
		invalidEmail: "Email is not valid",
		passwordMatch: "Passwords do not match"
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
		this.clearErrors()

		if (this.emailIsValid(this.state.loginEmail)) {
			axios.post("/login", {
				email: this.state.loginEmail,
				password: this.state.loginPassword
			})
			.then((res) => {
				this.setState({
					processing: false
				})
				this.props.history.push("/home")
			})
			.catch((err) => {
				this.setState({
					processing: false,
					formError: err.response ? err.response.data : "Error"
				})
			})
		} else {
			this.setState({
				processing: false,
				formError: "Email is not valid"
			})
		}
	} 

	clickedSubmitRegisterHandler = () => {
		this.setState({
			processing: true
		})
		this.clearErrors()


		if (this.emailIsValid(this.state.registerEmail)) {
			if (this.state.registerPassword == this.state.registerConfirmPassword) {
				axios.post("/register", {
					email: this.state.registerEmail,
					password: this.state.registerPassword
				})
				.then((res) => {
					this.setState({
						processing: false,
						formSuccess: true
					})
				})
				.catch((err) => {
					this.setState({
						processing: false,
						formError: err.response ? err.response.data : "Error"
					})
				})
			} else {
				this.setState({
					processing: false,
					formError: "Passwords do not match"
				})
			}
		} else {
			this.setState({
				processing: false,
				formError: "Email is not valid"
			})
		}
	}

	emailIsValid = (email) => {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	clearErrors = () => {
		this.setState({
			formError: "",
			serverError: ""
		})
	}

	render() {
		return (
			<div className="container-auth">
				<div className="body-sub-menu">
					<button onClick={this.props.history.goBack}> Back </button>
				</div>
				<Switch>
					<Route exact path="/auth/login">
						<Login
						clearErrors={this.clearErrors}
						processing={this.state.processing}
						clickedSubmit={this.clickedSubmitLoginHandler}
						updateEmail={this.updateLoginEmailHandler}
						updatePassword={this.updateLoginPasswordHandler}
						formError={this.state.formError}
						serverError={this.state.serverError}/>
					</Route>
					<Route path="/auth/register">
						<Register		
						clearErrors={this.clearErrors}
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