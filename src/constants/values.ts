import { Question } from "../interfaces/question";

export const values = {
    continue: "Continue",
    checkAnswer: "Check Answer",
    hint: "Fill in the missing word",
    answer: "Answer",
    successMessage: "Great Job!",
    finish: "Finish"

}

export interface Answer{
    id: number,
    text: string,
    correct?: boolean
}