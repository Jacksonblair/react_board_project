import React, { Component } from 'React'
import './PostCreator.css'

const PostCreator = props => {

	return (
		<div className="container-post-creator">	
			CREATING NEW POST
			<form>
				<input type="text" defaultValue="TITLE"/>
				<textarea defaultValue="CONTENT"/>
				<button> SUBMIT </button>
			</form>
		</div>
	)
}

export default PostCreator