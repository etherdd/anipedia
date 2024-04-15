import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrap App (root component) with Auth0Provider */}
    <Auth0Provider
      domain="dev-gqlnlgwrauklcpmj.us.auth0.com"
      clientId="vurbavL3ppsxSW6ELUA4mwedlFRs6O1D"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
