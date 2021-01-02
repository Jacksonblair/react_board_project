import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions.js'
import './HomeViewer.css'
import {
	Link
} from "react-router-dom"

import BoardButton from '../../components/Body/BoardButton/BoardButton'

class HomeViewer extends Component {

	state = {
		finishedLoading: false
	}

	componentDidMount = () => {

		/* If we go back to home, set boardToView in store to an empty object */
		this.props.updateBoardToView({})

		this.setState({
			finishedLoading: true
		})

	}

	render() {

		let boards = this.props.boards.map((board, i) => {
			return (
				<BoardButton 
				key={`board${i}`} 
				board={board}/>
			)
		})

		let boardList = this.state.finishedLoading ? 
			<div className="user-board-list">
				{boards}
				<Link to="/board/new">
					<div className="home-viewer-new-board-button color-4">
						<i className="fas fa-plus"></i>&nbsp;ADD NEW BOARD
					</div>
				</Link>
			</div>
			: <div> LOADING </div>
	
		let activityList = this.state.finishedLoading ? 
			<div className="user-activity-list bg-1">
				<div className="color-2"> 
					Not much going on right now...
				</div>
			</div>
			: <div> LOADING </div>


		return (
			<div className="container-home-viewer">
				<div className="container-user-board-list"> 
					<div className="user-board-list-header color-5">
						Boards
					</div>
					{boardList}
				</div>
				<div className="container-user-activity-list"> 
					<div className="user-activity-list-header color-5">
						Activity
					</div>
					{activityList}
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		boards: state.boards,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateBoardToView: (boardToView) => dispatch({ type: actionTypes.BOARD_TO_VIEW_UPDATE, payload: { boardToView: boardToView }}),
		updateBoards: (boards) => dispatch({ type: actionTypes.BOARDS_UPDATE, payload: { boards: boards }}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewer)