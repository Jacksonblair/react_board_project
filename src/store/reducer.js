import * as actionTypes from './actions';

const initialState = {
	hasInit: false,

	/* User Auth */
	userDetails: {
		user_id: null,
		username: null,
		email: null,
		profile_image_url: null,
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
	boards: [], 
	currentBoard: {},
	currentBoardPosts: [],
	currentPost: {},

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

	/* Date setting functionality */
	dateRangeType: 0,
	dateRangeStart: null,
	dateRangeEnd: null,
	postTargetDate: new Date(),

	/* Post editing functionality */
	editedPostTitle: "",
	editedPostContent: "",
	editedPostId: null,

	/* New post functionality */
	newPostTitle: "",
	newPostContent: ""
}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
		case actionTypes.HAS_INIT_UPDATE:
			return {
				...state,
				hasInit: true
			}
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
		case actionTypes.CURRENT_BOARD_POSTS_UPDATE:
			return {
				...state,
				currentBoardPosts: action.payload.posts
			}
		case actionTypes.CURRENT_POST_UPDATE:
			return {
				...state,
				currentPost: action.payload.post
			}


		/* PostEditor functionality */
		case actionTypes.EDITED_POST_TITLE_UPDATE:
			return {
				...state,
				editedPostTitle: action.payload.title
			}		
		case actionTypes.EDITED_POST_CONTENT_UPDATE:
			return {
				...state,
				editedPostContent: action.payload.content
			}
		
		case actionTypes.EDITED_POST_ID_UPDATE:
			return {
				...state,
				editedPostId: action.payload.id
			}


		/* PostCreator functionality */
		case actionTypes.NEW_POST_TITLE_UPDATE:
			return {
				...state,
				newPostTitle: action.payload.title
			}
		case actionTypes.NEW_POST_CONTENT_UPDATE:
			return {
				...state,
				newPostContent: action.payload.content
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


		/* Date setting functionality */
		case actionTypes.DATE_RANGE_TYPE_UPDATE:
			return {
				...state,
				dateRangeType: action.payload.type
			}
		case actionTypes.DATE_RANGE_START_UPDATE:
			/* If range start date is after stored range end, we update range end also */
			if (state.dateRangeEnd && action.payload.date > state.dateRangeEnd) {
				return {
					...state,
					dateRangeEnd: action.payload.date,
					dateRangeStart: action.payload.date
				}
			} else {
				return {
					...state,
					dateRangeStart: action.payload.date
				}
			}
		case actionTypes.DATE_RANGE_END_UPDATE:
			if (state.dateRangeStart && action.payload.date < state.dateRangeStart) {
				return {
					...state,
					dateRangeEnd: action.payload.date,
					dateRangeStart: action.payload.date
				}
			} else {
				return {
					...state,
					dateRangeEnd: action.payload.date
				}
			}
		case actionTypes.POST_TARGET_DATE_UPDATE:
			return {
				...state,
				postTargetDate: action.payload.date,
			}


	}
	return state;
}

export default reducer;