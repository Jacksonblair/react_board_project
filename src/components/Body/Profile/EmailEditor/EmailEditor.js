import React, { Component, useEffect, useState } from 'react'
import './EmailEditor.css'
import {
	Link
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const EmailEditor = props => {

	let [ email, setEmail ] = useState("")
	let [ confirmEmail, setConfirmEmail ] = useState("")

	return (
		<div className="container-email-editor">
			<div className="board-form">
			<FormWrapper
			clearErrors={props.clearErrors}
			serverError={props.serverError}
			formError={props.formError}
			processing={props.processing}
			canView={props.userid == props.profile.id}
			resourceName="email">
				{ props.formSuccess ? 
				<div className="row">
					<div className="form-success"> 
						{props.formSuccess}&nbsp;<Link to={`/profile/${props.profile.id}/`}> Back to Profile </Link>
					</div>
				</div>
				: <React.Fragment>
					<div className="header">
						Edit Email
					</div>

					<div className="field-header">
						Current email: {props.profile.email}
					</div>

					<div className="row">
						<input className="email-new" placeholder="New email..." onChange={() => setEmail(event.target.value)}/>
					</div>
					
					<div className="row">
						<input className="email-new" placeholder="Confirm email..." onChange={() => setConfirmEmail(event.target.value)}/>
					</div>

					<div className="row">
						<button className="type-three" onClick={() => props.clickedSubmit(email, confirmEmail)}> Submit </button>
					</div>
				</React.Fragment> }
			</FormWrapper>
			</div>
		</div>
	)

}

export default EmailEditor