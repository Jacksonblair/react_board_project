import React, { Component } from 'React'
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
					Demonstration Website
				</div>				
				<div className="blurb">
					Create your own free board to manage your schedule, or share it with your friends or group. 
				</div>
				<div className="buttons">
					<Link className="register" to="/auth/register"> Sign up</Link>
					<div> Or if you're already user, <Link to="/auth/login"> Log In </Link> </div>
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