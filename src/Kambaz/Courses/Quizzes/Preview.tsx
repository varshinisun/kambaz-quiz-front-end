import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateQuiz } from "./reducer";
import { Button, Card, Form } from "react-bootstrap";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = useSelector((state: any) =>
    state.quizReducer.quizzes.find((q: any) => q._id === qid)
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const studentAttempts = (quiz?.attempts || []).filter((a: any) => a.userId === currentUser._id);
  const maxedOut = quiz?.multipleAttempts && studentAttempts.length >= quiz?.maxAttempts;
  const lastAttempt = studentAttempts[studentAttempts.length - 1];

  useEffect(() => {
    if (lastAttempt) {
      setAnswers(lastAttempt.answers);
      setScore(lastAttempt.score);
      setSubmitted(true);
    }
  }, []);

  if (!quiz) return <p>Quiz not found</p>;

  const handleChange = (qid: string, value: string) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = () => {
    if (maxedOut) return;

    let total = 0;
    quiz.questions.forEach((q: any) => {
      if (answers[q._id] === q.correctAnswer) {
        total += q.points;
      }
    });

    const updatedQuiz = {
      ...quiz,
      attempts: [
        ...(quiz.attempts || []),
        { userId: currentUser._id, answers, score: total, date: new Date() }
      ]
    };

    dispatch(updateQuiz(updatedQuiz));
    setScore(total);
    setSubmitted(true);
  };

  return (
    <div className="container mt-4 text-start">
      <h2>{quiz.title} – {isFaculty ? "Preview" : "Quiz Page"}</h2>
      <p className="text-muted">{quiz.description}</p>

      {quiz.questions.map((q: any, idx: number) => (
        <Card className="mb-3" key={q._id}>
          <Card.Body>
            <Card.Title>
              {idx + 1}. {q.title} ({q.points} pts)
            </Card.Title>

            {q.type === "Multiple Choice" || q.type === "True/False" ? (
              <Form>
                {q.options.map((opt: string, i: number) => (
                  <Form.Check
                    key={i}
                    type="radio"
                    name={`question-${q._id}`}
                    label={opt}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                    disabled={submitted}
                  />
                ))}
              </Form>
            ) : q.type === "Fill in the Blank" ? (
              <Form.Control
                type="text"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                disabled={submitted}
              />
            ) : null}

            {submitted && (
              <div className="mt-2">
                {answers[q._id] === q.correctAnswer ? (
                  <span className="text-success">Correct ✓</span>
                ) : (
                  <span className="text-danger">
                    Incorrect. Correct answer: {q.correctAnswer}
                  </span>
                )}
                {q.feedback && <div className="text-muted small">Feedback: {q.feedback}</div>}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {isFaculty && (
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </Button>
      )}

      {isStudent && quiz.multipleAttempts && (
        <p className="text-muted small">
          Attempts used: {studentAttempts.length} / {quiz.maxAttempts || "∞"}
        </p>
      )}

      <hr />

      {!submitted && !maxedOut ? (
        <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
      ) : (
        <div className="mt-4">
          <h4>Your Score: {score} / {quiz.questions.reduce((acc: number, q: any) => acc + q.points, 0)}</h4>
          {isStudent && maxedOut && (
            <p className="text-muted">You've reached the maximum number of attempts.</p>
          )}
          {!isFaculty && (
            <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
              Back to Quizzes
            </Button>
          )}
        </div>
      )}
    </div>
  );
}