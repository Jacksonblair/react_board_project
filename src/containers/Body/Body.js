import React, { Component } from 'React'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as actionTypes from '../../store/actions.js'
import './Body.css'

import BodyMenu from '../../components/Body/BodyMenu/BodyMenu.js'
import ProfileViewer from '../ProfileViewer/ProfileViewer.js'
import HomeViewer from '../HomeViewer/HomeViewer.js'
import Board from '../Board/Board.js'
import CSSTransition from '../Util/CSSTransition/CSSTransition'

class Body extends Component {

	state = {

	}

	getInterface = (index) => {
		/* The keys for these containers are for ReactCSSTransitionGroup */
		if (index == 0)
			return ( <HomeViewer/> )
		if (index == 1)
			return ( <Board/> )
		if (index == 2)
			return ( <ProfileViewer/> )
	}

	render() {
		return (
			<div className="_container-body">
				<div className="_container-center-column">
					<Switch>
						{/* TODO: Check if authed, if not, render landing */}
						<Route exact path="/">
							<Redirect to="/home"/>
						</Route>
						<Route exact path="/home">
							{this.getInterface(0)}
						</Route>
						<Route path="/board">
							{this.getInterface(1)}
						</Route>
						<Route path="/profile">
							{this.getInterface(2)}
						</Route>
					</Switch>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dateRangeType: state.dateRangeType,
		postToView: state.postToView,
		boardToView: state.boardToView,
		posts: state.posts,
		boards: state.boards,
		viewType: state.viewType
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateRangeType: (rangeType) => dispatch({ type: actionTypes.DATE_RANGE_TYPE_UPDATE, payload: { rangeType: rangeType }  }), 
		updateBoardToView: (boardToView) => dispatch({ type: actionTypes.BOARD_TO_VIEW_UPDATE, payload: { boardToView: boardToView }  }), 
		updatePostToView: (postToView) => dispatch({ type: actionTypes.POST_TO_VIEW_UPDATE, payload: { postToView: postToView }  }), 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)