import * as actionTypes from './actions';

const initialState = {
	month: 0,
	year: 2020
}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
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
	}
	return state;
}

export default reducer;