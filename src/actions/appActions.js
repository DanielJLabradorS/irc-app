import { SAVEMESSAGES } from '../types/actionTypes';

export const saveMessages = (message) => async (dispatch) => {
	dispatch({ type: SAVEMESSAGES, payload: message });
};

