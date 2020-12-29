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
		/* TODO: REAL API CALL */
		/* Fake API call to backend for user boards */
		setTimeout(() => {

			this.props.updateBoards([
				{
					id: 0,
					name: "Board name 1",
				},
				{
					id: 1,
					name: "Board name 2",
				},
				{
					id: 2,
					name: "Board name 3",
				}
			])
  
			this.setState({
				finishedLoading: true
			})

		}, 300)
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
					<Link to="/board/new">
						<div className="home-viewer-new-board-button color-4">
							<i className="fas fa-plus"></i>&nbsp;ADD NEW BOARD
						</div>
					</Link>
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
		updateBoards: (boards) => dispatch({ type: actionTypes.BOARDS_UPDATE, payload: { boards: boards }}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewer)