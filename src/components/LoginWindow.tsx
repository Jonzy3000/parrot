import { useSelector, useDispatch } from "react-redux";
import { selectUserState, storeUser } from "./authentication/redux/userReducer";
import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export const LoginWindow = () => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();
  debugger;
  React.useEffect(() => {
    debugger;
    dispatch(
      storeUser({
        name: "hello",
        token: window.location.hash.split("&")[0].split("=")[1]
      })
    );
  }, [dispatch]);

  if (user.isAuthenticated && user.user && user.user.token) {
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${user.user.token}`
    };
  }

  return user.isAuthenticated ? <Redirect to="/" /> : <div>ERROR</div>;
};
