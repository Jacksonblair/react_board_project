import React, { Component } from 'react'
import './Login.css'
import {
	Link,
	withRouter
} from "react-router-dom";

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const Login = props => {

	return (
		<div className="container-login"> 
			<div className="auth-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={true}
				resourceName="email">
					<div className="guest-details"> 
						<div> Guest Email: <div> guest@live.com </div></div>
						<div> Guest Password: <div> 123456 </div></div>
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
						type="password"
						onChange={() => props.updatePassword(event.target.value)}
						autoComplete="current-password"
						placeholder="password"/>
					</div>
					<div className="row">
						<button className="type-one" onClick={props.clickedSubmit}> Submit </button>
					</div>
				</FormWrapper>
			</div>
		</div>
	)

}

export default Login