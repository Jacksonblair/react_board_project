import React, { Component, useEffect, useState } from 'react'
import './EmailEditor.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const EmailEditor = props => {

	/*
		When this component loads, we need do a check if the id of profile we're viewing
		.. is the same as the id of the user
		Otherwise display an error message
	*/

	let [ email, setEmail ] = useState("")
	let [ confirmEmail, setConfirmEmail ] = useState("")

	let updateEmail = (email) => {
		setEmail(email)
	}

	let updateConfirmEmail = (email) => {
		setConfirmEmail(email)
	}

	return (
		<div className="container-email-editor">
			<div className="profile-form">
			<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userid == props.profile.id}
				resourceName="email">
				
				<div className="header">
					Edit Email
				</div>

				<div className="field-header">
					Current email: {props.profile.email}
				</div>

				<div className="row">
					<input className="email-new" placeholder="New email..." onChange={() => updateEmail(event.target.value)}/>
				</div>
				
				<div className="row">
					<input className="email-new" placeholder="Confirm email..." onChange={() => updateConfirmEmail(event.target.value)}/>
				</div>

				<div className="row">
					<button onClick={() => props.clickedSubmit(email, confirmEmail)}> Submit </button>
				</div>

			</FormWrapper>
			</div>
		</div>
	)

}

export default EmailEditor