import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap"; 
import { useSelector } from "react-redux";
// import * as db from "./Database";

export default function Dashboard({
  courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = db;

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>{course._id === "0" ? "Add a New Course" : "Edit Course"}
            <button className="btn btn-secondary float-end"
                    onClick={addNewCourse} id="wd-add-new-course-click">
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click"
                    disabled={course._id === "0"}> 
              Update
            </button>
          </h5>
          <hr />

          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="Enter Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            className="mb-2"
            placeholder="Enter Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses    
            // .filter((course) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === course._id))
            .map((courseItem) => (
              <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "260px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${courseItem._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark">
                    <Card.Img variant="top" src='assets/NU_CMYK_Notched-N_wordmark_RW.png' width="100%" height={160} />
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {courseItem.name}
                      </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {courseItem.description}
                      </Card.Text>
                      
                      <Button variant="secondary" size="sm" className="me-2 align-left">
                        Go
                      </Button>

                      {isFaculty && (
                        <>
                          <button 
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(courseItem); 
                            }} 
                            className="btn btn-warning btn-sm me-2 align-items-center"
                            id="wd-edit-course-click">
                            Edit
                          </button>

                          <button 
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(courseItem._id);
                            }} 
                            className="btn btn-danger btn-sm align-items-right"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                        </>
                      )}

                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
