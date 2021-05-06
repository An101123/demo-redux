import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

const POINT = 30
const questions: QuizQuestion[] = [
  {
    text: 'question 1',
    solution: 'B',
    timeout: 2500,
    answers: [{ answer: 'A', text: 'blalba' }, { answer: 'B', text: 'bloble' }, { answer: 'C', text: 'hehe' }, { answer: 'D', text: 'hihi' }]
  }
]

interface Answer {
  text: string;
  answer: string;
}

interface QuizQuestion {
  text: string;
  solution: string;
  answers: Answer[]
  timeout: number
}

interface QuizState {
  point: number;
  currentQuestionNumber: number;
  currentQuestion: QuizQuestion;
}

const initialState: QuizState = {
  point: 0,
  currentQuestionNumber: 0,
  currentQuestion: questions[0]
}

export const QuizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion: state => {
      const nextCurrentQuestion = state.currentQuestionNumber + 1
      if (questions.length < nextCurrentQuestion) {
        throw new Error('Out of question')
      }
      state.currentQuestion = questions[nextCurrentQuestion]
      state.currentQuestionNumber = nextCurrentQuestion
    },
    anwserQuestion: (state, action: PayloadAction<string>) => {
      const currentQuestion = state.currentQuestion
      if (currentQuestion.solution === action.payload) {
        state.point += POINT
      }
    }
  }
})

export const { nextQuestion, anwserQuestion } = QuizSlice.actions;

export default QuizSlice.reducer;