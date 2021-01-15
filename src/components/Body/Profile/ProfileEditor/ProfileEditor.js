import React, { Component, useEffect } from 'react'
import './ProfileEditor.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'

const ProfileEditor = props => {

	console.log(props)

	/*
		When this component loads, we need do a check if the id of profile we're viewing
		.. is the same as the id of the user
		Otherwise display an error message
	*/

	return (
		<div className="container-profile-editor">
			<div className="profile-form">
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
					<input defaultValue="Some field..."/>
				</div>

				<div className="row">
					<button> Submit </button>
				</div>

			</FormWrapper>
			</div>
		</div>
	)

}

export default ProfileEditor