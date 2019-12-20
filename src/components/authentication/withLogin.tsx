import { useSelector } from "react-redux";
import { selectUserState } from "./redux/userReducer";
import React from "react";
import { ImplicitGrant } from "./implicitGrant";

export const withLogin = (Component: React.ElementType) =>
  React.memo(props => {
    const userState = useSelector(selectUserState);
    debugger;
    if (userState.isAuthenticated) {
      return <Component {...props} />;
    }

    new ImplicitGrant().redirectToLoginPortal();

    return <div></div>; // this is weird
  });
