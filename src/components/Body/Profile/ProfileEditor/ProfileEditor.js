import React, { Component, useEffect } from 'react'
import './ProfileEditor.css'

const ProfileEditor = props => {

	console.log(props)

	/* On dismount clear errors relative to the <ProfileEditor> from <Profile> */
	useEffect(() => {
		return () => props.clearErrors()
	}, [])

	/*
		When this component loads, we need do a check if the id of profile we're viewing
		.. is the same as the id of the user
		Otherwise display an error message
	*/

	let content = props.processing ? <div className="loading-message"> <i className="fas fa-asterisk"/> </div> 
	: props.userid == props.profile.id ? 
		<React.Fragment>
			{ props.serverError ? 
			<div className="row">	
				<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }

			<div className="row">
				<button> Submit </button>
			</div>

			{ props.formError ? 
			<div className="row">
				<div className="form-error"> {props.formError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }
		</React.Fragment>
	: <div className="row">
		<div className="server-error"> You cannot edit this profile <i className="fas fa-exclamation"/> </div>
	</div>

	return (
		<div className="container-profile-editor">
			<div className="profile-form">
				{content}
			</div>
		</div>
	)

}

export default ProfileEditor