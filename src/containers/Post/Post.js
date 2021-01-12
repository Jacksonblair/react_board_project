import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import './Post.css'
import {
	withRouter
} from "react-router-dom";

class Post extends Component {

	state = {

	}

	componentDidMount = () => {


	}

	componentDidUpdate = (prevProps) => {

	}

	getInterface = (index) => {
		
	}

	render() {
		return (
			<div className="container-post">
				Post
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))