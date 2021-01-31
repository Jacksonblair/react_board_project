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
						<AnimatePresence location={this.props.location} key={this.props.location.pathname}>
						<Switch>
							<Route path="/home">
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									{ this.props.userDetails.user_id ?
										<Home/>
										: <Redirect to="/landing"/>
									}
								</motion.div>
							</Route>
							<Route path="/auth/">
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<Auth/>
								</motion.div>
							</Route>
							<Route path="/board/:boardid">
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<Board/>
								</motion.div>
							</Route>
							<Route path="/profile/:userid">
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<Profile/>
								</motion.div>
							</Route>
							<Route exact path="/landing"> 
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<Landing/>
								</motion.div>
							</Route>
							<Route exact path="/toc"> 
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<TermsAndConditions/>
								</motion.div>
							</Route>
							<Route exact path="/contact"> 
								<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
									<Contact/>
								</motion.div>
							</Route>
							<Route>
								<Redirect to="/home"/>
							</Route>
						</Switch>
						</AnimatePresence>
						: <div className="init"><i className="fas fa-asterisk"></i></div>
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