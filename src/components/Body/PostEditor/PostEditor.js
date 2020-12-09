import React, { Component } from 'React'
import './PostEditor.css'

const PostEditor = props => {

	return (
		<div className="container-post-editor">	
			{props.post.title}
			{props.post.content}
		</div>
	)
}

export default PostEditor