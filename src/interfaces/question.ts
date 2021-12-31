import { Answer } from "../constants/values";

export interface Question{
    id: number,
    hint: string,
    question_title: string,
    answer: Answer[],
    givenAnswer?: Answer
}