import * as actionTypes from './actions';

const initialState = {
	month: 0,
	year: 2020,
	calendarUnit: 0
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
		case actionTypes.CALENDAR_UNIT_UPDATE:
			return {
				...state,
				calendarUnit: action.payload.unit
			}
	}
	return state;
}

export default reducer;