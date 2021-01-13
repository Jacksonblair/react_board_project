import React, { Component } from 'React'
import './Register.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const Register = props => {

	return (
		<div className="container-register"> 
			<div className="auth-form">
				<div className="row">
					<div className="server-error"> Server error <i className="fas fa-exclamation"></i> </div>
				</div>
				<div className="header"> Register </div>
				<div className="row">
					<input 
					onChange={() => props.updateEmail(event.target.value)}
					autoComplete="email"
					placeholder="email"/>
				</div>
				<div className="row">
					<input 
					onChange={() => props.updatePassword(event.target.value)}
					autoComplete="new-password"
					placeholder="password"/>
				</div>
				<div className="row">
					<input 
					onChange={() => props.updateConfirmPassword(event.target.value)}
					autoComplete="new-password"
					placeholder="confirm password"/>
				</div>
				<div className="row">
					<button> Submit </button>
				</div>
				<div className="row">
					<div className="form-error"> Form error <i className="fas fa-exclamation"></i> </div>
				</div>
			</div>
		</div>
	)

}

export default Register