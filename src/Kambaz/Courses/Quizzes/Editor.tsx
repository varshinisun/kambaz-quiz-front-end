import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addQuiz, updateQuiz, deleteQuiz } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Modal, Tabs, Tab, ListGroup } from "react-bootstrap";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  // const isStudent = currentUser?.role === "STUDENT";

  const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [quiz, setQuiz] = useState(() => {
    const baseQuiz = existingQuiz || {
      _id: uuidv4(),
      title: "",
      description: "",
      points: 0,
      dueDate: "",
      availableDate: "",
      availableUntil: "",
      course: cid,
      published: false,
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      questions: []
    };
    return {
      ...baseQuiz,
      questions: baseQuiz.questions || []
    };
  });

  // const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(isFaculty ? "details" : "questions");

  const handleTabSelect = (key: string | null) => {
    if (!isFaculty && (key === "details" || key === "editor")) return;
    setActiveTab(key || "questions");
  };

  const handleChange = (e: any) => {
    const { id, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : type === "number" ? parseInt(value) : value;
    setQuiz({ ...quiz, [id]: val });
  };

  const handleSave = () => {
    const totalPoints = quiz.questions.reduce((acc: number, q: any) => acc + (q.points || 0), 0);
    const updatedQuiz = { totalPoints, ...quiz, };
    if (existingQuiz) {
      dispatch(updateQuiz(updatedQuiz));
    } else {
      dispatch(addQuiz(updatedQuiz));
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

const handleAddQuestion = (type: string) => {
  let newQuestion: any;

  if (type === "True/False") {
    newQuestion = {
      _id: uuidv4(),
      title: "New True/False Question",
      type: "True/False",
      options: ["True", "False"],
      correctAnswer: "True",
      feedback: "",
      points: 1,
      editing: true,
    };
  } else if (type === "Fill in the Blank") {
    newQuestion = {
      _id: uuidv4(),
      title: "New Fill-in-the-Blank Question",
      type: "Fill in the Blank",
      correctAnswer: "",
      feedback: "",
      points: 1,
      editing: true,
    };
  } else {
    newQuestion = {
      _id: uuidv4(),
      title: "New Multiple Choice Question",
      type: "Multiple Choice",
      options: ["Option 1", "Option 2"],
      correctAnswer: "Option 1",
      feedback: "",
      points: 1,
      editing: true,
    };
  }

  setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
};


  // const handleStudentAnswer = (qid: string, value: string) => {
  //   setAnswers({ ...answers, [qid]: value });
  // };

  return (
    <div id="wd-quiz-editor" className="container mt-4 text-start">
      <h2>{existingQuiz ? "Edit Quiz" : "New Quiz"}</h2>

      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3 text-danger" justify>
        {isFaculty && (
          <Tab eventKey="details" title="Details" >
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select id="quizType" value={quiz.quizType} onChange={handleChange}>
                  <option>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select id="assignmentGroup" value={quiz.assignmentGroup} onChange={handleChange}>
                  <option>Quizzes</option>
                  <option>Exams</option>
                  <option>Assignments</option>
                  <option>Project</option>
                </Form.Select>
              </Form.Group>
              <Form.Check type="checkbox" id="shuffleAnswers" label="Shuffle Answers" checked={quiz.shuffleAnswers} onChange={handleChange} className="mb-2" />
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control id="timeLimit" type="number" value={quiz.timeLimit} onChange={handleChange} />
              </Form.Group>
              <Form.Check type="checkbox" id="multipleAttempts" label="Allow Multiple Attempts" checked={quiz.multipleAttempts} onChange={handleChange} className="mb-2" />
              {quiz.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control id="maxAttempts" type="number" value={quiz.maxAttempts} onChange={handleChange} />
                </Form.Group>
              )}
              <Form.Check type="checkbox" id="showCorrectAnswers" label="Show Correct Answers" checked={quiz.showCorrectAnswers} onChange={handleChange} className="mb-2" />
              <Form.Group className="mb-3">
                <Form.Label>Access Code</Form.Label>
                <Form.Control id="accessCode" type="text" value={quiz.accessCode} onChange={handleChange} />
              </Form.Group>
              <Form.Check type="checkbox" id="oneQuestionAtATime" label="One Question at a Time" checked={quiz.oneQuestionAtATime} onChange={handleChange} className="mb-2" />
              <Form.Check type="checkbox" id="webcamRequired" label="Webcam Required" checked={quiz.webcamRequired} onChange={handleChange} className="mb-2" />
              <Form.Check type="checkbox" id="lockQuestionsAfterAnswering" label="Lock Questions After Answering" checked={quiz.lockQuestionsAfterAnswering} onChange={handleChange} className="mb-2" />
            </Form>
          </Tab>
        )}

        {isFaculty && (
          <Tab eventKey="editor" title="Editor">
            <Form>
              {["title", "description", "points", "availableDate", "availableUntil", "dueDate"].map((id) => (
                <Form.Group key={id} className="mb-3">
                  <Form.Label htmlFor={id}>{id.replace(/([A-Z])/g, " $1")}</Form.Label>
                  <Form.Control
                    id={id}
                    type={id.toLowerCase().includes("date") ? "date" : id === "points" ? "number" : "text"}
                    value={quiz[id] || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              ))}
              <div className="mt-3">
                <Button variant="secondary" size="sm" className="me-2" onClick={handleSave}>Save Quiz</Button>
                <Button variant="warning" size="sm" className="me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>Cancel</Button>
                {existingQuiz && (<Button variant="danger" size="sm" onClick={() => setShowModal(true)}>Delete</Button>)}
                <Button variant={quiz.published ? "danger" : "success"} size="sm" className="ms-2" onClick={() => setQuiz({ ...quiz, published: !quiz.published })}>
                  {quiz.published ? "Unpublish 🚫" : "Publish ✅"}
                </Button>
              </div>
            </Form>
          </Tab>
        )}

        <Tab eventKey="questions" title={`Questions (${quiz.questions.reduce((acc: number, q: any) => acc + (q.points || 0), 0)} pts)`}>
          {isFaculty && (
              <div className="mb-3 d-flex gap-2">
                <Button onClick={() => handleAddQuestion("Multiple Choice")} variant="success" size="sm">
                  + Multiple Choice
                </Button>
                <Button onClick={() => handleAddQuestion("True/False")} variant="success" size="sm">
                  + True/False
                </Button>
                <Button onClick={() => handleAddQuestion("Fill in the Blank")} variant="success" size="sm">
                  + Fill in the Blank
                </Button>
              </div>
            )}
          {(quiz.questions || []).length === 0 ? (
            <p className="text-muted">No questions yet.</p>
          ) : (
            <ListGroup>
              {(quiz.questions || []).map((q: any, idx: number) => (
                <ListGroup.Item key={q._id}>
                  {q.editing ? (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={q.title}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            updated[idx].title = e.target.value;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Points</Form.Label>
                        <Form.Control
                          type="number"
                          value={q.points}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            updated[idx].points = parseInt(e.target.value);
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Question Type</Form.Label>
                        <Form.Select
                          value={q.type}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            updated[idx].type = e.target.value;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        >
                          <option>Multiple Choice</option>
                          <option>True/False</option>
                          <option>Fill in the Blank</option>
                        </Form.Select>
                      </Form.Group>

                      {q.type === "Multiple Choice" && (
                        <>
                          <Form.Group className="mb-2">
                            <Form.Label>Options</Form.Label>
                            {q.options.map((option: string, i: number) => (
                              <Form.Control
                                key={i}
                                className="mb-1"
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const updated = [...quiz.questions];
                                  updated[idx].options[i] = e.target.value;
                                  setQuiz({ ...quiz, questions: updated });
                                }}
                              />
                            ))}
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                const updated = [...quiz.questions];
                                updated[idx].options.push("");
                                setQuiz({ ...quiz, questions: updated });
                              }}
                            >
                              + Add Option
                            </Button>
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Select
                              value={q.correctAnswer}
                              onChange={(e) => {
                                const updated = [...quiz.questions];
                                updated[idx].correctAnswer = e.target.value;
                                setQuiz({ ...quiz, questions: updated });
                              }}
                            >
                              {q.options.map((option: string, i: number) => (
                                <option key={i}>{option}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </>
                      )}

                      {q.type === "True/False" && (
                        <Form.Group className="mb-2">
                          <Form.Label>Correct Answer</Form.Label>
                          <Form.Select
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const updated = [...quiz.questions];
                              updated[idx].correctAnswer = e.target.value;
                              setQuiz({ ...quiz, questions: updated });
                            }}
                          >
                            <option>True</option>
                            <option>False</option>
                          </Form.Select>
                        </Form.Group>
                      )}

                      {q.type === "Fill in the Blank" && (
                        <Form.Group className="mb-2">
                          <Form.Label>Correct Answer</Form.Label>
                          <Form.Control
                            type="text"
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const updated = [...quiz.questions];
                              updated[idx].correctAnswer = e.target.value;
                              setQuiz({ ...quiz, questions: updated });
                            }}
                          />
                        </Form.Group>
                      )}

                      <Form.Group className="mb-2">
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={q.feedback || ""}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            updated[idx].feedback = e.target.value;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            const updated = [...quiz.questions];
                            updated[idx].editing = false;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            const updated = [...quiz.questions];
                            updated.splice(idx, 1);
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{q.title}</strong> — {q.points} pts — <em>{q.type}</em>
                      </div>
                      {isFaculty && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            const updated = [...quiz.questions];
                            updated[idx].editing = true;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
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
