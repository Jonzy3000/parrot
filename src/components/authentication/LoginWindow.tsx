import { useSelector, useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  selectUserSessionState,
  storeUserSession
} from "./redux/userSessionReducer";

export const LoginWindow = () => {
  const userSession = useSelector(selectUserSessionState);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      storeUserSession({
        expirestAt: new Date(Date.now() + 3600 * 1000).getTime(),
        token: window.location.hash.split("&")[0].split("=")[1]
      })
    );
  }, [dispatch]);

  if (userSession.isAuthenticated) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${userSession.token}`
    };
  }

  return userSession.isAuthenticated ? <Redirect to="/" /> : <div>ERROR</div>;
};
