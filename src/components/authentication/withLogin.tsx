import { useSelector } from "react-redux";
import React from "react";
import { ImplicitGrant } from "./implicitGrant";
import { selectUserSessionState } from "./redux/userSessionReducer";

export const withLogin = (Component: React.ElementType) =>
  React.memo(props => {
    const userSession = useSelector(selectUserSessionState);
    if (userSession.isAuthenticated) {
      return <Component {...props} />;
    }

    new ImplicitGrant().redirectToLoginPortal();

    return <div></div>; // this is weird
  });
