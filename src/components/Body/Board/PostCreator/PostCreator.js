import React, { Component, useState } from 'react'
import './PostCreator.css'

import FormWrapper from '../../Util/FormWrapper/FormWrapper.js'
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown.js'

const PostCreator = props => {

	let [ title, setTitle ] = useState("")
	let [ content, setContent ] = useState("")
	let [ date, setDate ] = useState(new Date())

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
		setDate(new Date(year, month, day))
		setShowCalendarDropdown(false)
	}

	return (
		<div className="container-post-creator"> 
			<form className="board-form">
				<FormWrapper
				clearErrors={props.clearErrors}
				serverError={props.serverError}
				formError={props.formError}
				processing={props.processing}
				canView={true}
				resourceName="profile">
					<div className="header">
						Creating New Post
					</div>
					<div className="row">
						<div className="target-date div-button" 
						onKeyPress={pressedKeyCalendarDropdown}
						onClick={clickedCalendarDropdown}
						onBlur={blurredCalendarDropdown} 
						tabIndex={0}>
							Date: {date.toLocaleDateString("EN-au")}
							<CalendarDropdown 
							leftOnly={true}
							startDate={date}
							clickedDay={clickedDay}
							visible={showCalendarDropdown}/>
						</div>
					</div>					
					<div className="row">
						<input 
						defaultValue={title}
						placeholder="A post title..."
						onChange={() => setTitle(event.target.value)}/>
					</div>
					<div className="row">
						<textarea 
						defaultValue={content}
						placeholder="Some content..."
						onChange={() => setContent(event.target.value)}/>
					</div>
					<div className="row">
						<button type="submit" onClick={() => props.clickedSubmit(event, title, content, date)}> Submit </button>
					</div>
				</FormWrapper>
			</form>
		</div>
	)

}

export default PostCreator