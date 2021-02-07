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
				<button className="type-one" onClick={() => props.history.goBack()}> Back </button>
			</div>
			<div className="content">
				<div className="header"> Contact <i className="fas fa-hand-point-left"/></div>
				<div className="paragraph">
					I'm a Computer Science student at Deakin University and an aspiring 'full-stack' web developer from the ACT, Australia.
				</div>
				<div className="buttons">
					<button onClick={clickedCopy} className="type-three">
						{ copied ? "Copied to clipboard!" : 
						<React.Fragment> 
							<i className='fas fa-envelope'></i>&nbsp;
							jackson.blair@live.com 
						</React.Fragment>}
					</button>
					<a href="https://github.com/Jacksonblair" target="_blank"><button className="type-three"> Github </button></a>
					<a href="https://www.linkedin.com/in/jackson-blair-ba2542b1/" target="_blank"><button className="type-three"> LinkedIn </button></a>
				</div>
			</div>
		</div>
	)

}


/*david-edelstein-N4DbvTUDikw-unsplash*/

export default withRouter(Contact)