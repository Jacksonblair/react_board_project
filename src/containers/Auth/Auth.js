import React, { Component } from 'React'
import './Auth.css'
import { connect } from 'react-redux'
import axios from 'axios'
import {
	Switch,
	Route,
	Redirect,
	withRouter
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'

import Login from '../../components/Body/Auth/Login/Login.js'
import Register from '../../components/Body/Auth/Register/Register.js'

class Auth extends Component {

	state = {
		loginEmail: "",
		loginPassword: "",
		registerEmail: "",
		registerPassword: "",
		registerConfirmPassword: "",
		serverError: "",
		formError: ""
	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {
		/* If we swap from login to register, or vice versa, clear the error variables in state */
		if (prevProps.history.location != this.props.history.location) {
			this.setState({
				serverError: "",
				formError: ""
			})
		}
	}

	updateLoginPasswordHandler = (password) => {
		this.setState({
			loginPassword: password
		})
	}

	updateLoginEmailHandler = (email) => {
		this.setState({
			loginEmail: email
		})
	}

	updateRegisterEmailHandler = (email) => {
		this.setState({
			registerEmail: email
		})
	}

	updateRegisterPasswordHandler = (password) => {
		this.setState({
			registerPassword: password
		})
	}

	updateRegisterConfirmPasswordHandler = (password) => {
		this.setState({
			registerConfirmPassword: password
		})
	}

	clickedSubmitLoginHandler = () => {

	}

	clickedSubmitRegisterHandler = () => {

	}

	render() {
		return (
			<div className="container-auth">
				<Switch>
					<Route exact path="/auth/login">
						<Login
						clickedSubmit={this.clickedSubmitLoginHandler}
						updateEmail={this.updateLoginEmailHandler}
						updatePassword={this.updateLoginPasswordHandler}
						formError={this.state.formError}
						serverError={this.state.serverError}/>
					</Route>
					<Route path="/auth/register">
						<Register		
						clickedSubmit={this.clickedSubmitRegisterHandler}
						updateEmail={this.updateRegisterEmailHandler}
						updatePassword={this.updateRegisterPasswordHandler}				
						updateConfirmPassword={this.updateRegisterConfirmPasswordHandler}				
						formError={this.state.formError}
						serverError={this.state.serverError}/>
					</Route>
					<Route>
						<Redirect to="/auth/login"/>
					</Route>
				</Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))