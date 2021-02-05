import React, { Component, useEffect } from 'react'
import './ResourceWrapper.css'

const ResourceWrapper = props => {

	let content

	if (props.readError) {
		content = (
			<div className="read-error"> {props.readError} <i className="fas fa-exclamation-triangle"></i> </div>
		)
	} else if (!props.finishedLoading) {
		content = (
			<div className="loading-message"> <i className="fas fa-asterisk"></i> </div>
		)
	} else {
		content = (
			<React.Fragment>
				{props.children}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{ content }
		</React.Fragment>
	)

}

export default ResourceWrapper