//import { useState } from 'react'
import './App.css'
import Labs from "./Labs.tsx";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import AssignmentEditor from './Kambaz/Courses/Assignments/Editor.tsx';
// import Quizzes from './Kambaz/Courses/Quizzes/index.tsx';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Provider store={store}>
      <div>
        {/* <Labs /> */}
        <Routes>
        <Route path="/" element={<Navigate to="Kambaz"/>}/>
        <Route path= "/" element ={<Navigate to= "Labs" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
        <Route path="/Kambaz/Courses/:cid/Assignments/assignmentId" element={<AssignmentEditor />} />
        {/* <Route path="/Kambaz/Courses/:cid/Quizzes/" element={<Quizzes />}/> */}

        </Routes>
      </div>
      </Provider>
      </HashRouter>
  );
}

export default App
