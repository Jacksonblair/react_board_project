import React, { Component } from 'React'
import './BoardEditor.css'
import { connect } from 'react-redux'
import {
	Link,
	withRouter
} from "react-router-dom";

class BoardEditor extends Component {

	state = {
		name: ""
	}

	nameChangedHandler = (updatedName) => {
		this.setState({
			name: updatedName
		})
	}

	clickedSubmitEditedBoardHandler = () => {
		console.log("SUBMITTING EDITED BOARD")
	}

	componentDidMount = () => {
		this.setState({
			name: this.props.board.name
		})
	}

	render() {
		return (
			<div className="container-board-editor">	
				<div className="board-sub-menu bg-1">
					<Link to={`/board/${this.props.match.params.boardid}`}> 
						<div className="board-sub-menu-button color-2">
							<i className="fas fa-arrow-left"/>&nbsp;Back
						</div>
					</Link>
				</div>

				<form className="board-form">
					<div className="board-form-title color-2">
						Edit board
					</div>
					<input type="text" 
					className="board-form-input board-name"
					onChange={() => this.nameChangedHandler(event.target.value)} 
					placeholder="Enter a board name..." 
					value={this.state.name}/>
					<div 
					onClick={this.clickedSubmitEditedBoardHandler}
					className="board-form-button submit bg-3 color-2">
						Save changes
					</div>
				</form> 
			</div>
		)	
	}

}

const mapStateToProps = (state) => {
	return {
		postToView: state.postToView,
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardEditor))
