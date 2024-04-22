import { useAuth0 } from "@auth0/auth0-react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

export default function NavBar({ selected }) {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={logo} className="logo" alt="logo"></img>

      <ul>
        <li className={selected === "/" ? "navbar-selected-li" : ""}>
          <a onClick={() => navigate("/")} text="HOME">
            Home
          </a>
        </li>
        <li className={selected === "/top-movies" ? "navbar-selected-li" : ""}>
          <a onClick={() => navigate("/top-movies")}>Top Picks</a>
        </li>
        <li className={selected === "/top-persons" ? "navbar-selected-li" : ""}>
          <a onClick={() => navigate("/top-persons")}>Directors</a>
        </li>
        <li className={selected === "/search" ? "navbar-selected-li" : ""}>
          <a onClick={() => navigate("/search")}>Search</a>
        </li>
      </ul>

      <div>
        {isAuthenticated && (
          // If isAuthenticated is true (user has logged in), display welcome message
          <div className="welcome">
            {console.log(user)}
            <span>
              {/* Use given_name if present. Otherwise, use nickname. Otherwise, use name. */}
              {/* This is because given_name/nickname are much shorter, which is better for display */}
              Welcome, {user.given_name || user.nickname || user.name}
            </span>
          </div>
        )}
        {/* Display login/logout buttons */}
        <ul style={{ display: "inline-block", paddingInlineStart: 0 }}>
          <li>
            {/* If isLoading, we display nothing to avoid confusion */}
            {!isLoading &&
              // If authenticated, display logout button. Otherwise, display login button.
              (isAuthenticated ? (
                <a
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log out
                </a>
              ) : (
                <a
                  onClick={() =>
                    loginWithRedirect({
                      appState: {
                        returnTo: window.location.pathname,
                      },
                    })
                  }
                >
                  Log in
                </a>
              ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
