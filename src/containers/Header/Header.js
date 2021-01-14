import React, { Component } from 'React'
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

	componentDidMount = () => {


	}

	componentDidUpdate = (prevProps) => {

	}

	getInterface = (index) => {
		
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

	clickedOption = () => {
		console.log("Clicked option")
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
				<div className="menu">
					<Link className="logo" to="/home">
						<div/>
					</Link>
					<Link className="home" to="/home">
						<i className="fas fa-home"></i>
					</Link>
					<button className="navigate" onClick={this.clickedNavigationOptions} onBlur={this.blurredNavigationOptions}>
						<div className="location"> #Navigate </div>
						<div className={`options ${this.state.showNavigationOptions ? "show" : null}`}>
							{options}
						</div>
					</button>
					<Link to={`/profile/${this.props.userDetails.id}`} className="profile">
						<i className="fas fa-user"></i>
					</Link>
					<button className="menu" onClick={this.clickedMenuOptions} onBlur={this.blurredMenuOptions}>
						<div className="bar"/>
						<div className="bar"/>
						<div className="bar"/>
						<div className={`options ${this.state.showMenuOptions ? "show" : null}`}>
							<Link to="/auth/login" className={`option ${this.props.location.pathname.includes('/login') ? "disabled" : null}`}> Log in</Link>
							<Link to="/auth/register" className={`option ${this.props.location.pathname.includes('/register') ? "disabled" : null}`}> Register </Link>
						</div>
					</button>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		userDetails: state.userDetails,
		boards: state.boards
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))