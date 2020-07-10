import React from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "../authentication/redux/userReducer";
import { Heading } from "grommet";

export const Welcome = React.memo(() => {
  const user = useSelector(selectUserState);

  return user.name != null ? <Heading>Hi, {user.name}</Heading> : null;
});
