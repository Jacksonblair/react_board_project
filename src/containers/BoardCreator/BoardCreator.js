import React, { Component } from 'React'
import './BoardCreator.css'
import {
	Link,
	withRouter
} from "react-router-dom";

class BoardCreator extends Component {

	state = {
		name: ""
	}

	nameChangedHandler = () => {
		console.log("CHANGED NAME")
	}

	render() {
		return (
			<div className="container-board-creator">
				
				<div className="board-sub-menu bg-1">
					<Link to={`/home`}> 
						<div className="board-sub-menu-button color-2">
							<i className="fas fa-arrow-left"/>&nbsp;Back
						</div>
					</Link>
				</div>

				<form className="board-form">
					<div className="board-form-title color-2">
						Create new board
					</div>
					<input 
					onChange={() => this.nameChangedHandler(event.target.value)}
					className="board-form-input title" defaultValue={this.state.name} placeholder="Add a board name..."/>
					<div 
					onClick={this.clickedSubmitPostHandler}
					className="board-form-button submit bg-3 color-2">Create New Board</div>
				</form> 

			</div>
		)	
	}
}

export default withRouter(BoardCreator)