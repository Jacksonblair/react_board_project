import React, { Component, useEffect } from 'react'
import './FormWrapper.css'

const FormWrapper = props => {

	// Dismount function for cleaning any errors relative to this component from parent container
	// Ex. clear errors for <ProfileEditor> from <Profile> container
	useEffect(() => {
		return () => props.clearErrors ? props.clearErrors() : null
	}, [])

	/*
		When this component loads, we need do a check if the id of profile we're viewing
		.. is the same as the id of the user
		Otherwise display an error message
	*/

	let content = props.processing ? <div className="loading-message"> <i className="fas fa-asterisk"/> </div> 
	: props.canView ? 
		<React.Fragment>
			{ props.serverError ? 
			<div className="row">	
				<div className="server-error"> {props.serverError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }

			{ props.children }

			{ props.formError ? 
			<div className="row">
				<div className="form-error"> {props.formError} <i className="fas fa-exclamation"></i> </div>
			</div>
			: null }
		</React.Fragment>
	: <div className="row">
		<div className="server-error"> You cannot edit this {props.resourceName} <i className="fas fa-exclamation"/> </div>
	</div>

	return (
		<React.Fragment>
			{content}
		</React.Fragment>
	)

}

export default FormWrapper