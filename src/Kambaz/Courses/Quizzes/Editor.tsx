import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addQuiz, updateQuiz, deleteQuiz } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Modal, Tabs, Tab } from "react-bootstrap";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [quiz, setQuiz] = useState(existingQuiz || {
    _id: uuidv4(),
    title: "",
    description: "",
    points: "",
    dueDate: "",
    availableUntil: "",
    course: cid,
    published: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e: any) => {
    setQuiz({ ...quiz, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    if (existingQuiz) {
      dispatch(updateQuiz(quiz));
    } else {
      dispatch(addQuiz(quiz));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleDelete = () => {
    if (existingQuiz) {
      dispatch(deleteQuiz(quiz._id));
      setShowModal(false);
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }
  };

  return (
    <div id="wd-quiz-editor" className="container mt-4 text-start">
      <h2>{existingQuiz ? "Edit Quiz" : "New Quiz"}</h2>

      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || "details")}
        className="mb-3 text-danger"
        justify
      >
        <Tab eventKey="details" title="Details">
          <Form>
            {["title", "description", "points", "dueDate", "availableUntil"].map((id) => (
              <Form.Group key={id} className="mb-3">
                <Form.Label htmlFor={id}>{id.replace(/([A-Z])/g, " $1")}</Form.Label>
                <Form.Control
                  id={id}
                  type={id.includes("Date") ? "date" : id === "points" ? "number" : "text"}
                  value={quiz[id] || ""}
                  onChange={handleChange}
                  disabled={!isFaculty}
                />
              </Form.Group>
            ))}

            {isFaculty && (
              <div className="mt-3">
                <Button variant="secondary" size="sm" className="me-2" onClick={handleSave}>
                  Save Quiz
                </Button>
                <Button variant="warning" size="sm" className="me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
                  Cancel
                </Button>
                {existingQuiz && (
                  <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
                    Delete
                  </Button>
                )}
              </div>
            )}
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <p className="text-muted">Question builder coming soon...</p>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
