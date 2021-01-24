import React, { Component } from 'React'
import './Register.css'
import {
	Link,
	withRouter
} from "react-router-dom";

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const Register = props => {
	return (
		<div className="container-register"> 
			<div className="auth-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formSuccess={props.formSuccess}
				formError={props.formError}
				processing={props.processing}
				canView={true}
				resourceName="email">
					{props.formSuccess ? 
						<div className="row">
							<div className="form-success"> 
								Success! <Link to="/auth/login"> Log In </Link>
							</div>
						</div>
						: <React.Fragment>  
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
						</React.Fragment>
					}
				</FormWrapper>
			</div>
		</div>
	)

}

export default Register