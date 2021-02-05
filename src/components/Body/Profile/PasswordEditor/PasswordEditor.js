import React, { Component, useState } from 'react'
import './PasswordEditor.css'
import {
	Link
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const PasswordEditor = props => {

	let [ oldPassword, setOldPassword ] = useState("")
	let [ newPassword, setNewPassword ] = useState("")
	let [ confirmNewPassword, setConfirmNewPassword ] = useState("")

	return (
		<div className="container-profile-editor">
			<div className="board-form">
			<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userid == props.profile.id}
				resourceName="profile">
				{ props.formSuccess ? 
				<div className="row">
					<div className="form-success"> 
						{props.formSuccess}&nbsp;<Link to={`/profile/${props.profile.id}/`}> Back to Profile </Link>
					</div>
				</div>
				: <React.Fragment>
					<div className="header">
						Edit Password
					</div>

					<div className="row">
						<input type="password" autoComplete="password" className="password-old" placeholder="Old password..." onChange={() => setOldPassword(event.target.value)}/>
					</div>				

					<div className="row">
						<input type="password" autoComplete="password-new" className="password-new" placeholder="New password..." onChange={() => setNewPassword(event.target.value)}/>
					</div>
					
					
					<div className="row">
						<input type="password" autoComplete="password-new" className="password-new" placeholder="Confirm new password..." onChange={() => setConfirmNewPassword(event.target.value)}/>
					</div>

					<div className="row">
						<button className="type-three" onClick={() => props.clickedSubmit(oldPassword, newPassword, confirmNewPassword)}> Submit </button>
				</div>
				</React.Fragment> }
			</FormWrapper>
			</div>
		</div>
	)

}

export default PasswordEditor