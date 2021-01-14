import React, { Component } from 'React'
import './Register.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const Register = props => {

	let content = props.processing ? 
	<div className="loading-message"> <i className="fas fa-asterisk"/> </div>
	: props.formSuccess ? 
	<div className="row">
		<div className="form-success"> 
			Success! <Link to="/auth/login"> Log In </Link>
		</div>
	</div>
	: <React.Fragment>
		{ props.serverError ? 
		<div className="row">	
			<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
		</div>
		: null }
		<div className="header"> Register </div>
		<div className="row">
			<input 
			onChange={() => props.updateEmail(event.target.value)}
			autoComplete="email"
			placeholder="email"/>
		</div>
		<div className="row">
			<input 
			type="password"
			onChange={() => props.updatePassword(event.target.value)}
			autoComplete="new-password"
			placeholder="password"/>
		</div>
		<div className="row">
			<input 
			type="password"
			onChange={() => props.updateConfirmPassword(event.target.value)}
			autoComplete="new-password"
			placeholder="confirm password"/>
		</div>
		<div className="row">
			<button onClick={props.clickedSubmit}> Submit </button>
		</div>
		{ props.formError ? 
		<div className="row">
			<div className="form-error"> Form error <i className="fas fa-exclamation"></i> </div>
		</div>
		: null }
	</React.Fragment>

	return (
		<div className="container-register"> 
			<div className="auth-form">
				{content}
			</div>
		</div>
	)

}

export default Register