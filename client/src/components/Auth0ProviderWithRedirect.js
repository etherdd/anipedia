import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Add component to authentication using Auth0
// https://developer.auth0.com/resources/guides/spa/react/basic-authentication
export default function Auth0ProviderWithRedirect({ children }) {
  const navigate = useNavigate();

  // After login, go to the same page right before login.
  const handleAuth0Redirect = (appState) => {
    console.log(`redirect back to ${appState.returnTo}`);
    navigate(appState.returnTo);
  };

  return (
    <Auth0Provider
      domain="dev-gqlnlgwrauklcpmj.us.auth0.com"
      clientId="vurbavL3ppsxSW6ELUA4mwedlFRs6O1D"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={handleAuth0Redirect}
    >
      {children}
    </Auth0Provider>
  );
}
