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

	/* App Content */
		/* Boards showns in <Home> */
	boards: [], 
	currentBoard: {},
	currentBoardPosts: [],
	currentPost: {},
}

const reducer = (state = initialState, action) => {

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

	}
	return state;
}

export default reducer;