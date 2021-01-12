import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Header.css'
import {
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
		return (
			<div className="container-header">
				<div className="menu">
					<a className="logo" href="">
						<div/>
					</a>
					<a className="home" href="">
						<i className="fas fa-home"></i>
					</a>
					<button className="navigate" onClick={this.clickedNavigationOptions} onBlur={this.blurredNavigationOptions}>
						<div className="location"> #Navigate </div>
						<div className={`options ${this.state.showNavigationOptions ? "show" : null}`}>
							<a className="option" onClick={this.clickedOption} tabIndex={0}>
								Option 1
							</a>
							<a className="option" onClick={this.clickedOption} tabIndex={0}>
								Option 2
							</a>
						</div>
					</button>
					<a className="profile" href="">
						<i className="fas fa-user"></i>
					</a>
					<button className="menu" onClick={this.clickedMenuOptions} onBlur={this.blurredMenuOptions}>
						<div className="bar"/>
						<div className="bar"/>
						<div className="bar"/>
						<div className={`options ${this.state.showMenuOptions ? "show" : null}`}>
							<a className="option" tabIndex={0}> Option 1</a>
							<a className="option" tabIndex={0}> Option 2 </a>
						</div>
					</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))