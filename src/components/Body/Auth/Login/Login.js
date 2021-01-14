import React, { Component } from 'React'
import './Login.css'
import {
	Link,
	withRouter
} from "react-router-dom";

const Login = props => {

	console.log(props)

	let content = !props.processing ? 
		<React.Fragment>
			{ props.serverError ? 
			<div className="row">	
				<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }

			<div className="header"> Login </div>
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
				autoComplete="current-password"
				placeholder="password"/>
			</div>
			<div className="row">
				<button onClick={props.clickedSubmit}> Submit </button>
			</div>

			{ props.formError ? 
			<div className="row">
				<div className="form-error"> {props.formError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }
		</React.Fragment>
		: <div className="loading-message"> <i className="fas fa-asterisk"/> </div>

	return (
		<div className="container-login"> 
			<div className="auth-form">
				{content}
			</div>
		</div>
	)

}

export default Login