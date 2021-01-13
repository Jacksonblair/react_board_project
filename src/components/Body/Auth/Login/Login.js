import React, { Component } from 'React'
import './Login.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const Login = props => {

	return (
		<div className="container-login"> 
			<div className="auth-form">
				<div className="row">
					<div className="server-error"> Server error <i className="fas fa-exclamation"></i> </div>
				</div>
				<div className="header"> Login </div>
				<div className="row">
					<input 
					onChange={() => props.updateEmail(event.target.value)}
					autoComplete="email"
					placeholder="email"/>
				</div>
				<div className="row">
					<input 
					onChange={() => props.updatePassword(event.target.value)}
					autoComplete="current-password"
					placeholder="password"/>
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

export default Login