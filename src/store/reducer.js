import * as actionTypes from './actions';

const initialState = {
	/* viewType: What interface we're viewing in <Body/> */
	/* 
	Home Viewer: 0, 
	Board Viewer: 1, 
	Profile Viewer: 2
	*/
	
	viewType: 0,
	month: 0,
	year: 2020,
	calendarUnit: 0,
	dateRangeType: 0, /* On, Before, After */
	dateRangeStart: null,
	dateRangeEnd: null,
	postToView: {},
	boardToView: {},
	posts: [],
	boards: [],
	searchTerm: "",
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
	}
}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
		case actionTypes.SEARCH_TERM_UPDATE:
			return {
				...state,
				searchTerm: action.payload.searchTerm
			}
		case actionTypes.POST_TO_VIEW_UPDATE:
			return {
				...state,
				postToView: action.payload.post
			}
		case actionTypes.POSTS_UPDATE:
			return {
				...state,
				posts: action.payload.posts
			}
		case actionTypes.BOARD_TO_VIEW_UPDATE:
			return {
				...state,
				boardToView: action.payload.boardToView
			}
		case actionTypes.BOARDS_UPDATE:
			return {
				...state,
				boards: action.payload.boards
			}
		case actionTypes.VIEW_TYPE_UPDATE:
			return {
				...state,
				viewType: action.payload.viewType
			}
		case actionTypes.DATE_RANGE_TYPE_UPDATE:
			return {
				...state,
				dateRangeType: action.payload.rangeType
			}
		case actionTypes.MONTH_UPDATE:
			return {
				...state,
				month: action.payload.month
			}
		case actionTypes.YEAR_UPDATE:
			return {
				...state,
				year: action.payload.year
			}
		case actionTypes.CALENDAR_UNIT_UPDATE:
			return {
				...state,
				calendarUnit: action.payload.unit
			}
		case actionTypes.RANGE_START_UPDATE:
			/* Make sure range is valid (start not later than end)*/
			if (action.payload.rangeStart > state.dateRangeEnd && state.dateRangeEnd !== null) {
				return {
					...state,
					dateRangeStart: action.payload.rangeStart,
					dateRangeEnd: action.payload.rangeStart
				}				
			} else {
				return {
					...state,
					dateRangeStart: action.payload.rangeStart
				}		
			}
		case actionTypes.RANGE_END_UPDATE:
			/* Make sure range is valid (end not earlier than start)*/
			if (action.payload.rangeEnd < state.dateRangeStart && state.dateRangeStart !== null) {
				return {
					...state,
					dateRangeEnd: action.payload.rangeEnd,
					dateRangeStart: action.payload.rangeEnd
				}
			} else {
				return {
					...state,
					dateRangeEnd: action.payload.rangeEnd
				}	
			}
	}
	return state;
}

export default reducer;