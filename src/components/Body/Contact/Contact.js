import React, { Component, useState } from 'react'
import './Contact.css'
import { withRouter } from 'react-router-dom'

const Contact = props => {

	let [ copied, setCopied ] = useState(false)

	let clickedCopy = () => {
		const el = document.createElement('textarea');
		el.value = "jackson-blair@live.com";
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		setCopied(true)
	}

	return (
		<div className="container-contact"> 
			<div className="body-sub-menu">
				<button onClick={() => props.history.goBack()}> Back </button>
			</div>
			<div className="content">
				<div className="header"> Contact Information </div>
				<button id="emailCopyButton" onClick={clickedCopy}>
					{ copied ? "Copied to clipboard!" : "jackson.blair@live.com" }
				</button>
			</div>
		</div>
	)

}

export default withRouter(Contact)