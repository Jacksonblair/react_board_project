import React, { Component } from 'react'
import './CSSTransition.css'

class CSSTransition extends Component {

	/* State machine CSS animation handler */
	/* TODO: Needs work */


	state = {
		/* 
		0: Static, 
		1: Exiting, 
		2: Exited,  
		3: Entering,
		4: Entered  */
		animationState: 0, 
		children: null,
		transitionTimeout: null,
		canUpdate: true
	}

	animClasses = [
		"css-transition",
		"css-transition exiting",	
		"css-transition entering",
	]

	componentDidUpdate = (prevProps, prevState) => {
		console.log(this.props)
		console.log(this.props.children)
	}

	componentDidMount = () => {
		this.setState({
			children: this.props.children
		})
	}

	render() {
		return (
			<div className={this.animClasses[this.state.animationState % 2]}>
				{this.props.children}
			</div>
		)
	}
}

export default CSSTransition