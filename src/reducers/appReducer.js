import {SAVEMESSAGES } from '../types/actionTypes';
const INITIAL_STATE = {
	messages: [],
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVEMESSAGES:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
