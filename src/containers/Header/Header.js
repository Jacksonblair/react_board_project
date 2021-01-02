import React, { Component } from 'React'
import * as actionTypes from '../../store/actions.js'
import { connect } from 'react-redux'
import './Header.css'
import {
	withRouter
} from "react-router-dom";

import HeaderProfileWindow from '../../components/Header/HeaderProfileWindow/HeaderProfileWindow'
import HeaderLogoWindow from '../../components/Header/HeaderLogoWindow/HeaderLogoWindow'
import HeaderNavigationWindow from '../../components/Header/HeaderNavigationWindow/HeaderNavigationWindow'
import HeaderMenuWindow from '../../components/Header/HeaderMenuWindow/HeaderMenuWindow'

class Header extends Component {

	state = {

	}

	clickedBoardOptionHandler = (option) => {
		console.log(option)
		this.props.history.push(`/board/${option}`)
	}

	clickedProfileHandler = () => {
		this.props.updateViewType(2)
	}

	clickedHomeHandler = () => {
		console.log("CLICKED HOME")
		this.props.updateViewType(0)
	}

	render() {
		return (
			<div className="_container-header">
				<div className="_container-header-center-column">
					<div className="container-header-menu bg-1">
						<HeaderLogoWindow/>
						<HeaderNavigationWindow 
							clickedBoardOption={this.clickedBoardOptionHandler}
							boards={this.props.boards}
							boardToView={this.props.boardToView}
							clickedHome={this.clickedHomeHandler}/>
						<HeaderProfileWindow 
							authed={this.props.authed}
							clickedProfile={this.clickedProfileHandler}/>
						<HeaderMenuWindow clickedMenu={this.props.clickedMenu}/>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		authed: state.authed,
		boards: state.boards,
		boardToView: state.boardToView
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateViewType: (viewType) => dispatch({ type: actionTypes.VIEW_TYPE_UPDATE, payload: { viewType: viewType }  }), 
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))