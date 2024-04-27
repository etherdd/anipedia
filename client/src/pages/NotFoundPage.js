import { Container } from "@mui/material";
import { NavLink } from 'react-router-dom';

import './NotFoundPage.css';

export default function NotFoundPage() {

  return (
    <div className="not-found-page">
      <div className="nav-bar-holding-block"></div>
      <Container style={{ color: "white", top: "60px" }}>
        <p>You seem to be lost.</p>
        <NavLink to={`/`}>Go to Home Page</NavLink>
      </Container>
    </div>
  );
}
