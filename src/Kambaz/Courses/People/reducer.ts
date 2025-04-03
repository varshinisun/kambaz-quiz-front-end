import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as { user: string; course: string }[]
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action) => {
      const exists = state.enrollments.find(
        (e) =>
          e.user === action.payload.user &&
          e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push(action.payload);
      }
    },
    deleteEnrollment: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(
            e.user === action.payload.user &&
            e.course === action.payload.course
          )
      );
    }
  }
});

export const { setEnrollments, addEnrollment, deleteEnrollment } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;
