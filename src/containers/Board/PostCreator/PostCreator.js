import React, { Component } from 'React'
import './PostCreator.css'
import {
	Link,
	withRouter
} from "react-router-dom";

class PostCreator extends Component {

	state = {
		title: "",
		content: "" 
	}

	clickedSubmitPostHandler = () => {
		console.log("SUBMITTED POST")
	}

	titleChangedHandler = (updatedTitle) => {
		this.setState({
			title: updatedTitle
		})
	}

	contentChangedHandler = (updatedContent) => {
		this.setState({
			content: updatedContent
		})
	}

	render() {
		return (
			<div className="container-post-creator">	
				
				<div className="board-sub-menu bg-1">
					<Link to={`/board/${this.props.match.params.boardid}`}> 
						<div className="board-sub-menu-button color-2">
							<i className="fas fa-arrow-left"/>&nbsp;Back
						</div>
					</Link>
				</div>

				<form className="board-form">
					<div className="board-form-title color-2">
						Create new post
					</div>
					<input 
					onChange={() => this.titleChangedHandler(event.target.value)}
					className="board-form-input title" defaultValue={this.state.title} placeholder="Add a title..."/>
					<textarea 
					onChange={() => this.contentChangedHandler(event.target.value)}
					className="board-form-input content" defaultValue={this.state.content} placeholder="Add some content..."/>
					<div 
					onClick={this.clickedSubmitPostHandler}
					className="board-form-button submit bg-3 color-2">Submit New Post</div>
				</form> 
			</div>
		)	
	}

}

export default withRouter(PostCreator)