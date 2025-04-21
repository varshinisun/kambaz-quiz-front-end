import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import Preview from "./Quizzes/Preview";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger text-start">
      <FaAlignJustify className="me-4 fs-4 mb-1" /> 
      {course && course.name} &gt; {pathname.split("/")[4]}</h2>
      <hr />
      <div className="d-flex">
      <div className="d-none d-md-block">
            <CourseNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
            {/* <Route path="/Kambaz/Courses/:courseId/*" element={<CourseNavigation />} /> */}
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home/>} />
              <Route path="Modules" element={<Modules/>} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments" element={<h2>Assignments</h2>} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/:qid" element={<QuizEditor />} />
              <Route path="Quizzes/:qid/preview" element={<Preview />} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
            </div></div>
    </div>
  );
}
