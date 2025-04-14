import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const redLinkStyle = { color: "black" };

  return (
    <div id="wd-account-navigation">
      {!currentUser && (
        <>
          <Link
            to="/Kambaz/Account/Signin"
            style={redLinkStyle}
            className={pathname === "/Kambaz/Account/Signin" ? "active" : ""}
          >
            Signin
          </Link>
          <br />
          <Link
            to="/Kambaz/Account/Signup"
            style={redLinkStyle}
            className={pathname === "/Kambaz/Account/Signup" ? "active" : ""}
          >
            Signup
          </Link>
          <br />
        </>
      )}

      {currentUser && (
        <>
          <Link
            to="/Kambaz/Account/Profile"
            style={redLinkStyle}
            className={pathname === "/Kambaz/Account/Profile" ? "active" : ""}
          >
            Profile
          </Link>
          <br />
        </>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to="/Kambaz/Account/Users"
          style={redLinkStyle}
          className={pathname === "/Kambaz/Account/Users" ? "active" : ""}
        >
          Users
        </Link>
      )}
    </div>
  );
}
