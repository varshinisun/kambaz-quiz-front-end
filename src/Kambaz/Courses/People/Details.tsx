import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const fetchedUser = await client.findUserById(uid);
    setUser(fetchedUser);
    setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
    setEmail(fetchedUser.email || "");
    setRole(fetchedUser.role || "");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>

      <hr />

      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="w-100 mb-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        )}
      </div>

      <b>Email:</b>{" "}
      {editing ? (
        <FormControl
          className="w-100 mb-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <span className="wd-email">{user.email}</span>
      )}
      <br />

      <b>Role:</b>{" "}
      {editing ? (
        <select
          className="form-select mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select role</option>
          <option value="STUDENT">Student</option>
          <option value="TA">Assistant</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrator</option>
        </select>
      ) : (
        <span className="wd-role">{user.role}</span>
      )}
      <br />

      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>

      <hr />

      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
