import React, { Component } from 'React'
import axios from 'axios'
import './Login.css'
import {
  Link,
  withRouter
} from "react-router-dom";

class Login extends Component {

	state = {
		email: "",
		password: "",
		loggingIn: false,
		emailValid: true
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

	emailIsValid = (email) => {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	clickedLogin = () => {
		if (this.emailIsValid(this.state.email)) {
			if (!this.state.emailValid) {
				this.setState({
					emailValid: true
				})
			}

			this.setState({
				loggingIn: true
			})

			axios.post("/login", {
				email: this.state.email,
				password: this.state.password
			})
			.then((res) => {
				console.log(res)
				console.log("SUCCESS")
				this.setState({
					loggingIn: false
				})
			})	
			.catch((err) => {
				// TODO: Handle error
				console.log(err.response.data)
			})

		} else {
			this.setState({
				emailValid: false
			})
		}

		/* 
			TODO: POST request to server
			On success, redirect to /home
			On fail, show an error message

		*/
	}

	render() {
		return (
			<div className="container-login">
				<div className="board-sub-menu bg-1">
					<div onClick={this.props.history.goBack} className="board-sub-menu-button color-2">
						<i className="fas fa-arrow-left"/>&nbsp;Back
					</div>
				</div>

				<form className="board-form login">
					<div className="board-form-title color-2">
						Log In
					</div>

					<input type="email" 
					disabled={this.state.loggingIn}
					value={this.state.email}
					onChange={() => this.emailChangedHandler(event.target.value)}
					autoComplete="email"
					className="board-form-input email"
					placeholder="e-mail"/>					

					{this.state.emailValid ? null : <div className="board-form-input-error"> Invalid email </div>}

					<input type="password" 
					disabled={this.state.loggingIn}
					value={this.state.password}
					onChange={() => this.passwordChangedHandler(event.target.value)}
					autoComplete="current-password"
					className="board-form-input password"
					placeholder="password"/>

					<div 
					onClick={this.clickedLogin}
					className="board-form-button submit bg-3 color-2">
						Log In
					</div>
				</form> 
			</div>
		)
	}
}

export default withRouter(Login)