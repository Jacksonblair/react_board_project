import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'
import './Body.css'
import { AnimatePresence, motion } from "framer-motion"
import {
	withRouter
} from 'react-router-dom'

import Board from '../Board/Board.js'
import Home from '../Home/Home.js'
import Auth from '../Auth/Auth.js'
import Profile from '../Profile/Profile.js'
import Landing from '../Landing/Landing.js'
import TermsAndConditions from '../../components/Body/TermsAndConditions/TermsAndConditions.js'
import Contact from '../../components/Body/Contact/Contact.js'

class Body extends Component {

	state = {

	}

	componentDidMount = () => {

	}

	componentDidUpdate = (prevProps) => {

	}

	render() {

		return (
			<div className="container-body">
				<div className="column">
					{ this.props.hasInit ? 
						<Switch>
							<Route path="/home">
								{ this.props.userDetails.user_id ?
									<Home/>
									: <Redirect to="/landing"/>
								}
							</Route>
							<Route path="/auth/">
								<Auth/>
							</Route>
							<Route path="/board/:boardid" render={() => 
								<Board/> }>
							</Route>
							<Route path="/profile/:userid">
								<Profile/>
							</Route>
							<Route exact path="/landing"> 
								<Landing/>
							</Route>
							<Route exact path="/toc"> 
								<TermsAndConditions/>
							</Route>
							<Route exact path="/contact"> 
								<Contact/>
							</Route>
							<Route>
								<Redirect to="/home"/>
							</Route>
						</Switch>
						: <div className="loading-message"><i className="fas fa-asterisk"></i></div>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userDetails: state.userDetails,
		pageVariants: state.pageVariants,
		hasInit: state.hasInit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body))