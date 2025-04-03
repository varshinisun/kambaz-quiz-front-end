import { ListGroup, Button, Form } from "react-bootstrap";
import { RxDotsVertical, RxDragHandleDots2 } from "react-icons/rx";
import { RiArrowDropDownFill } from "react-icons/ri";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosRocket } from "react-icons/io";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);

  return (
    <div id="wd-quizzes" className="container mt-4">
      <Form.Control
        placeholder="Search for Quizzes"
        id="wd-search-quiz"
        className="mb-3"
      />

      {isFaculty && (
        <div className="d-flex gap-2 mb-3">
          <Button
            variant="danger"
            id="wd-add-quiz"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new`)}
          >
            + Quiz
          </Button>
        </div>
      )}

      <ListGroup id="wd-quiz-list">
        <ListGroup.Item className="d-flex align-items-center gap-2 p-3 bg-light border">
          <RxDragHandleDots2 />
          <RiArrowDropDownFill />
          QUIZZES
          <Button variant="outline-secondary" size="sm">20% of Total</Button>
          <Button variant="" size="sm">+</Button>
          <RxDotsVertical className="me-2" />
        </ListGroup.Item>

        {courseQuizzes.map((quiz: any) => (
          <ListGroup.Item key={quiz._id} className="wd-quiz-list-item">
            <RxDragHandleDots2 className="me-2" />
            <IoIosRocket />
            <a
              href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
              className="wd-quiz-link text-dark text-decoration-none"
            >
              {quiz.title}
            </a>
            <div className="text-danger small">Available until {quiz.availableUntil}</div>
            <div className="fw-normal text-muted small">
              Due {quiz.dueDate} | {quiz.points} Points{" "}
              {quiz.published ? <GreenCheckmark /> : <span className="text-muted">🚫</span>}
              <RxDotsVertical />
            </div>
          </ListGroup.Item>
          
        ))}
      </ListGroup>
    </div>
  );
}
