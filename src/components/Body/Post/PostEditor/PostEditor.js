import React, { Component, useState } from 'react'
import './PostEditor.css'
import {
	Link, 
	withRouter
} from 'react-router-dom'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'
import CalendarDropdown from '../../Util/CalendarDropdown/CalendarDropdown.js'

const PostEditor = props => {

/*	useEffect(() => {
		// If we're editing a different post, we update the store
		if (props.editedPostId != props.currentPost.id) {
			props.updateEditedPostTitle(props.currentPost.title)
			props.updateEditedPostContent(props.currentPost.content)
			props.updateEditedPostId(props.currentPost.id)
		} else {
			// We've come back to editing the same post.	
		}
	}, [])
*/

	let [ title, setTitle ] = useState(props.currentPost.title)
	let [ content, setContent ] = useState(props.currentPost.content)
	let [ dd, mm, yyyy ] = props.currentPost.target_date.split('/')
	let [ targetDate, setTargetDate ] = useState(new Date(yyyy, mm, dd))
	
	let [ showCalendarDropdown, setShowCalendarDropdown ] = useState(false)

	let blurredCalendarDropdown = (event) => {
		if (wasClickOutsideElement(event)) {
			setShowCalendarDropdown(false)
		}
	}	

	let clickedCalendarDropdown = () => {
		setShowCalendarDropdown(!showCalendarDropdown)
	}

	let pressedKeyCalendarDropdown = (event) => {
		if (event.charCode == 13) {
			setShowCalendarDropdown(!showCalendarDropdown)
		}
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	let clickedDay = (day, month, year) => {
		setTargetDate(new Date(year, month, day))
		setShowCalendarDropdown(false)
	}

	return (
		<div className="container-post-editor">
			<form className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={props.userDetails.user_id == props.currentPost.created_by_user_id}
				resourceName="post">

					<div className="header">
						Editing Post
					</div>
					<div className="row">
						<div className="target-date type-three div-button" 
						onKeyPress={pressedKeyCalendarDropdown}
						onClick={clickedCalendarDropdown}
						onBlur={blurredCalendarDropdown} 
						tabIndex={0}>
							Date: {targetDate.toLocaleDateString("EN-au")}
							<CalendarDropdown 
							calendarTitle={"Post Editor"}
							leftOnly={true}
							startDate={targetDate}
							clickedDay={clickedDay}
							visible={showCalendarDropdown}/>
						</div>
					</div>		
					<div className="row">
						<input 
						placeholder="A post title..."
						value={title}
						onChange={() => setTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						placeholder="Post content..."
						value={content}
						onChange={() => setContent(event.target.value)}/>
					</div>
					<div className="row">
						<button className="type-three" type="submit" onClick={(event) => props.clickedSubmit(event, title, content, targetDate)}> Submit Edit </button>
						<Link className="type-three" to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}`} onClick={props.cancelPostEdit} > Cancel </Link>
					</div>			
					<div className="row">
						<Link to={`/board/${props.match.params.boardid}/post/${props.match.params.postid}/delete`} className="delete type-three"> Delete Post&nbsp;<i className="fas fa-trash"></i></Link>
					</div>		

				</FormWrapper>
			</form>
		</div>
	)

}

export default withRouter(PostEditor)