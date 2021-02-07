import React, { Component, useEffect } from 'react'
import './ProfileEditor.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const ProfileEditor = props => {

	return (
		<div className="container-profile-editor">
			<form className="profile-form">
			<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userid == props.profile.id}
				resourceName="profile">
				
				<div className="header">
					Edit profile
				</div>

				<div className="row">
					<input placeholder="Some field..."/>
				</div>

				<div className="row">
					<button> Submit </button>
				</div>

			</FormWrapper>
			</form>
		</div>
	)

}

export default ProfileEditor