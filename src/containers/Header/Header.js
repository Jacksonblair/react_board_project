import React, { Component } from 'react'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Header.css'
import {
	Link,
	withRouter
} from "react-router-dom";

class Header extends Component {

	state = {
		showNavigationOptions: false,
		focusingNavigationOption: null,
		showMenuOptions: false
	}

	clickedNavigationOptions = () => {
		this.setState({
			showNavigationOptions: !this.state.showNavigationOptions
		})
	}

	clickedMenuOptions = () => {
		this.setState({
			showMenuOptions: !this.state.showMenuOptions
		})	
	}

	// Detects a click outside of the dropdown
	// .. so we can hide it
	/* https://stackoverflow.com/questions/32553158/detect-click-outside-react-component BY Niyaz*/
	blurredNavigationOptions = (event) => {
		if (this.wasClickOutsideElement(event)) {
			this.setState({
				showNavigationOptions: false
			})
		}
	}

	blurredMenuOptions = (event) => {
		if (this.wasClickOutsideElement(event)) {
			this.setState({
				showMenuOptions: false
			})
		}
	}

	wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	pressedKeyLogout = (event) => {
		if (event.charCode == 13) {
			this.clickedLogout()
		}
	}

	clickedLogout = () => {
		console.log("clicked logout")

		axios.post('/logout')
		.then((res) => {
			this.props.history.push('/')
		})
		.catch((err) => {
			this.props.history.push('/')
		})
	}

	render() {

		let options = this.props.boards.map((board, i) => {
			return (
				<Link className="option" to={`/board/${board.id}`} key={`BoardLink${i}`}>
					{board.name}
				</Link>
			)
		}) 

		return (
			<div className="container-header">
				{ this.props.hasInit ? 
					<div className="menu">
						<Link className="home" to="/home">
							<i className="fas fa-home" title="Go home"></i>
						</Link>
						{ this.props.userDetails.user_id ? 
							<React.Fragment>
							<button className={`navigate ${this.props.boards.length ? "show" : null }`} onClick={this.clickedNavigationOptions} onBlur={this.blurredNavigationOptions}>
								<div className="location"> Go to... </div>
								<div className={`options ${this.state.showNavigationOptions ? "show" : null}`}>
									{options}
								</div>
							</button>

							<button onClick={this.clickedLogout} className="logout"> Log Out </button>
							<Link to={`/profile/${this.props.userDetails.user_id}`} className="profile">
								<i className="fas fa-user" title="Go to profile"></i>
							</Link>
							</React.Fragment>
							: <React.Fragment>
							<Link to='/auth/register' className="register">
								Register
							</Link>
							<Link to='/auth/login' className="login">
								Log In
							</Link>
							</React.Fragment>

						}
						<button className={`menu ${this.props.userDetails.user_id ? "has-user" : null}`} onClick={this.clickedMenuOptions} onBlur={this.blurredMenuOptions}>
							<div className="bar"/>
							<div className="bar"/>
							<div className="bar"/>
							<div className={`options ${this.state.showMenuOptions ? "show" : null}`}>
								{ this.props.userDetails.user_id ? 
									<div onClick={this.clickedLogout} 
									onKeyPress={this.pressedKeyLogout}
									className="option" 
									tabIndex={0}> Log Out </div>
									: <React.Fragment>
										<Link to="/auth/login" className={`option ${this.props.location.pathname.includes('/login') ? "disabled" : null}`}> Log in</Link>
										<Link to="/auth/register" className={`option ${this.props.location.pathname.includes('/register') ? "disabled" : null}`}> Register </Link>
									</React.Fragment>
								}
							</div>
						</button>
					</div>
					: <div className="loading-message"><i className="fas fa-asterisk"></i></div>
				}
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		userDetails: state.userDetails,
		boards: state.boards,
		hasInit: state.hasInit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))