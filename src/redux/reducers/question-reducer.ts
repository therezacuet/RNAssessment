import { ReduxAction } from "../../interfaces/redux-action";
import { QuestionActionType } from "../types";
import _ from "lodash";

const initialState = {
    isFetchingRequest: false,
    questions: null,
    errorMessage: null
}

export const questionReducer = (state = initialState, action: ReduxAction<QuestionActionType>) => {
    switch(action.type) {
        
        case QuestionActionType.FETCHING_REQUEST : {
            return {
                ...state,
                isFetchingRequest: true
            };
        }

        case QuestionActionType.FETCHING_SUCCESS : {
            return {
                ...state,
                questions: action.payload,
                isFetchingRequest: false
            };
        }

        case QuestionActionType.FETCHING_FAILURE : {
            return {
                ...state,
                errorMessage: action.payload,
                isFetchingRequest: false
            };
        }
        default: return state;
    }
};