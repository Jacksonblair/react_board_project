import * as actionTypes from './actions';

const initialState = {
	/* User Auth */
	userDetails: {},

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
	boards: [], /* Boards showns in <Home> */
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
	currentPost: {},

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
	}
	return state;
}

export default reducer;