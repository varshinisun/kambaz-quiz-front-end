// import { useParams } from "react-router-dom";
// import * as db from "../../Database";
import { FaUserCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";
import PeopleDetails from "./Details";
import { Link } from "react-router";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  // const { cid } = useParams();
  // const { users, enrollments } = db;

  return (
    <div id="wd-people-table" className="table-responsive">
     <PeopleDetails />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-start">Full Name</th>
            <th className="text-start">Login ID</th>
            <th className="text-start">Section</th>
            <th className="text-start">Role</th>
            <th className="text-start">Last Activity</th>
            <th className="text-start">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users
            // .filter((usr) =>
            //   enrollments.some(
            //     (enrollment) => enrollment.user === usr._id && enrollment.course === cid
            //   )
            // )
            .map((user: any) => (
              <tr key={user._id}>
                <td className="text-start">
                <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>                  </Link>
                </td>
                <td className="text-start">{user.loginId}</td>
                <td className="text-start">{user.section}</td>
                <td className="text-start">{user.role}</td>
                <td className="text-start">{user.lastActivity}</td>
                <td className="text-start">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
