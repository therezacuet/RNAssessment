import { firebase } from "@react-native-firebase/database"
import { Answer } from "../../constants/values"
import { QuestionActionType } from "../types"

export const fetchingRequest = () => ({
    type: QuestionActionType.FETCHING_REQUEST
})

export const fetchingSuccess = (json: any) => ({
    type: QuestionActionType.FETCHING_SUCCESS,
    payload: json
})

export const fetchingFailure = (error: any) => ({
    type: QuestionActionType.FETCHING_FAILURE,
    payload: error
})

export const loadQuestions = () => {
    return async (dispatch: any) => {
        dispatch(fetchingRequest());
        firebase.database().ref("questions").on("value", function (snapshot) {
            let questions = snapshot.val();
            dispatch(fetchingSuccess(questions));
        }, function (error) { 
            console.log(error); 
            dispatch(fetchingFailure(error));
        });
    }
}