import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload }) => {
      const newQuiz = {
        ...payload,
        _id: uuidv4(),
        published: false, // default to unpublished
      };
      state.quizzes.push(newQuiz);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },
    updateQuiz: (state, { payload }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === payload._id ? { ...payload } : q
      );
    },
//     togglePublishQuiz: (state, { payload: quizId }) => {
//       state.quizzes = state.quizzes.map((q) =>
//         q._id === quizId ? { ...q, published: !q.published } : q
//       );
//     },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
//   togglePublishQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
