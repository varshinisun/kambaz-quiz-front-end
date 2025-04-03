import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`} to="/Labs/Lab1">
          Lab 1
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`} to="/Labs/Lab2">
          Lab 2
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`} to="/Labs/Lab3">
          Lab 3
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`} to="/Labs/Lab4">
          Lab 4
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`} to="/Labs/Lab5">
          Lab 5
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Kambaz">Kambaz</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://github.com/varshinisun/kambaz-react-web-app" target="_blank" rel="noopener noreferrer">
          My GitHub
        </a>
      </li>
    </ul>
  );
}
