import React, { Component } from 'react'
import './Landing.css'
import {
	Link
} from 'react-router-dom'

class Landing extends Component {

	state = {

	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {

	}


	render() {
		return (
			<div className="container-landing">
				<div className="title">
					Jackson Blair Portfolio Website
				</div>				
				<div className="blurb">
					A React CRUD app, using Redux, a Node/Express backend, PostgreSQL database and JavaScript Web Tokens, served from Heroku.
				</div>
				<div className="buttons">
					<Link className="register" to="/auth/register"> Sign up</Link>
					<div>Or <Link to="/auth/login"> Log In </Link> with the guest account</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default (Landing)