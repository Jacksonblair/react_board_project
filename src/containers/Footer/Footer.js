import React, { Component } from 'react'
import './Footer.css'

import {
	Link
} from 'react-router-dom'

class Footer extends Component {
	render() {
		return (
			<div className="container-footer">
				<Link to="/toc"> Terms and Conditions</Link>
				&nbsp;|&nbsp;
				<Link to="/contact"> Contact </Link>
				&nbsp;|&nbsp;
				<a href="https://pixabay.com/users/wanderercreative-855399/"> Default Profile Image</a>
			</div>

		)
	}
}

export default Footer