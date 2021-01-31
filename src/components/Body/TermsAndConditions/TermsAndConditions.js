import React, { Component } from 'react'
import './TermsAndConditions.css'
import { withRouter } from 'react-router-dom'

const TermsAndConditions = props => {
	return (
		<div className="container-terms-and-conditions"> 
			<div className="body-sub-menu">
				<button onClick={() => props.history.goBack()}> Back </button>
			</div>
			<div className="content">
				<div className="header"> Terms and Conditions </div>
				<div className="paragraph"> 
					This website is a portfolio piece to demonstrate the use of React, and though publicly available should not be used
					to reliably store content, as the website may change at any time. 
				</div>
			</div>
		</div>
	)

}

export default withRouter(TermsAndConditions)