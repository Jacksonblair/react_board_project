import React, { Component } from 'React'
import './Register.css'
import {
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from 'axios'

class Register extends Component {

	state = {

	}

	state = {
		email: "",
		password: "",
		confirmPassword: "",
		registering: false,
		emailValid: true,
		passwordsValid: true,
		errorMessage: ""
	}

	emailChangedHandler = (email) => {
		this.setState({
			email
		})
	}

	passwordChangedHandler = (password) => {
		this.setState({
			password
		})
	}

	confirmPasswordChangedHandler = (confirmPassword) => {
		this.setState({
			confirmPassword
		})
	}

	emailIsValid = (email) => {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	passwordIsValid = () => {
		return (this.state.password == this.state.confirmPassword)
	}

	clickedRegister= () => {

		/*  
			On submit, we need to check that the email is valid
			AND that both the passwords match
		*/

		if (this.emailIsValid(this.state.email)) {
			this.setState({
				emailValid: true
			})
		} else {
			this.setState({
				emailValid: false
			})
			return
		}

		if (this.passwordIsValid()) {
			this.setState({
				passwordsValid: true
			})
		} else {
			this.setState({
				passwordsValid: false
			})
			return
		}
		
		console.log("Email and passwords valid")
		/* TODO: Call to server */

		axios.post("/register", {
			email: this.state.email,
			password: this.state.password
		})		
		.then((res) => {
			// If we get here it's a success, redirect to /home
			console.log(res)
			this.props.history.push("/home")
		})	
		.catch((err) => {
			// Axios error
			this.setState({
				errorMessage: err.response.data
			})
		})

	}


	render() {
		return (
			<div className="container-register">
				<div className="board-sub-menu bg-1">
					<div onClick={this.props.history.goBack} className="board-sub-menu-button color-2">
						<i className="fas fa-arrow-left"/>&nbsp;Back
					</div>
				</div>

				<form className="board-form login">
					<div className="board-form-title color-2">
						Register
					</div>

					{this.state.errorMessage}

					<input type="text" 
					disabled={this.state.registering}
					value={this.state.email}
					onChange={() => this.emailChangedHandler(event.target.value)}
					autoComplete="email"
					className="board-form-input email"
					placeholder="e-mail"/>					

					<input type="password" 
					disabled={this.state.registering}
					value={this.state.password}
					onChange={() => this.passwordChangedHandler(event.target.value)}
					autoComplete="new-password"
					className="board-form-input password"
					placeholder="password"/>					

					<input type="password" 
					disabled={this.state.registering}
					value={this.state.confirmPassword}
					onChange={() => this.confirmPasswordChangedHandler(event.target.value)}
					autoComplete="new-password"
					className="board-form-input password"
					placeholder="confirm password"/>

					<div 
					onClick={this.clickedRegister}
					className="board-form-button submit bg-3 color-2">
						Register
					</div>
				</form> 
			</div>
		)
	}
}

export default withRouter(Register)