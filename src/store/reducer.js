import * as actionTypes from './actions';

const initialState = {
	/* User Auth */
	userDetails: {
		id: 1,
		email: "email@website.com",
		profile_image_url: "www.website.com/image.jpg"
	},

	/* CSS transition object */
	pageVariants: {
		initial: {
			opacity: 0,
		},
		in: {
			opacity: 1,
		},
		out: {
			opacity: 0,
		},
	},

	/* App Content */
		/* Boards showns in <Home> */
	boards: [
		{
			id: 1,
			name: "Test board",
			description: "A test board description",
			created_by_user_id: 1
		},
		{
			id: 2,
			name: "Test board 2",
			description: "A test board description",
			created_by_user_id: 1
		},
	], 
	currentBoard: {
		id: 1,
		name: "Test board",
		description: "A test board description",
		posts: [
			{ 
				id: 1,
				title: "Post 1",
				content: "Some content",
				target_date: new Date()
			},
			{ 
				id: 2,
				title: "Post 2",
				content: "Some content",
				target_date: new Date()
			},
			{ 
				id: 3,
				title: "Post 3",
				content: "Some content",
				target_date: new Date()
			},
		]
	},
	currentPost: {
		id: 1,
		title: "Post title",
		content: "Some post content"
	},

	/* BoardCalendarViewer Functionality */
	calendarUnit: 0, 
	/* 
		calendarUnit: (which units to display)
		0: day
		1: month
		2: year
	*/
	calendarYear: 2021,
	calendarMonth: 0,
	calendarDay: 1

}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
		case actionTypes.USER_DETAILS_UPDATE:
			return {
				...state,
				userDetails: action.payload.userDetails
			}
		case actionTypes.BOARDS_UPDATE:
			return {
				...state,
				boards: action.payload.boards
			}

		/* Board & Post */
		case actionTypes.CURRENT_BOARD_UPDATE:
			return {
				...state,
				currentBoard: action.payload.board
			}
		case actionTypes.CURRENT_POST_UPDATE:
			return {
				...state,
				currentPost: action.payload.post
			}

		/* BoardCalendarViewer Functionality */
		case actionTypes.CALENDAR_UNIT_UPDATE:
			return {
				...state,
				calendarUnit: action.payload.unit
			}
		case actionTypes.CALENDAR_MONTH_UPDATE:
			if (action.payload.month > 11) {
				return {
					...state,
					calendarMonth: 0,
					calendarYear: state.calendarYear + 1
				}
			} else if (action.payload.month < 0) {
				return {
					...state,
					calendarMonth: 11,
					calendarYear: state.calendarYear - 1
				}	
			} else {
				return {
					...state,
					calendarMonth: action.payload.month,
				}	
			}
		case actionTypes.CALENDAR_YEAR_UPDATE:
			return {
				...state,
				calendarYear: action.payload.year
			}
	}
	return state;
}

export default reducer;