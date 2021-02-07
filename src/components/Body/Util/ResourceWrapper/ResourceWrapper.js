import React, { Component, useEffect, useState } from 'react'
import './ResourceWrapper.css'
import {
	withRouter
} from 'react-router-dom'

const ResourceWrapper = props => {

	// Ref to prev props
	let [ prevGetResourceConditionValue, setGetResourceConditionValue ] = useState(props.match.params[props.getResourceCondition]) 

	// Get resource on first load
	useEffect(() => {
		props.getResource ? props.getResource() : null
	}, [])

	// On each update, we check if the url paramater that the resource is fetched with has changed
	// If it has (ie, a board id changes from 10 to 11 in the url)
	// We call the getResource prop to get that resource again with the new paramters
	useEffect(() => {
		if (prevGetResourceConditionValue != props.match.params[props.getResourceCondition]) {
			// console.log("Get resource condition value changed")
			setGetResourceConditionValue(props.match.params[props.getResourceCondition])
			props.getResource ? props.getResource() : null
		} 
	})

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

export default withRouter(ResourceWrapper)