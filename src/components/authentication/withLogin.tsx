import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { ImplicitGrant } from "./implicitGrant";
import { selectUserSessionState } from "./redux/userSessionReducer";
import { RootState } from "../../types/RootState";
import { getUser } from "./redux/userReducer";

export const withLogin = (Component: React.ElementType) =>
  React.memo(props => {
    const userSession = useSelector(selectUserSessionState);
    const location = useSelector((state: RootState) => state.router.location);

    if (userSession.isAuthenticated) {
      const dispatch = useDispatch();
      React.useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);

      return <Component {...props} />;
    }

    localStorage.setItem("before_redirect", location.pathname);
    new ImplicitGrant().redirectToLoginPortal();

    return <div></div>; // this is weird
  });
