import React from "react";
import { Header as GrHeader, Heading, Button } from "grommet";
import { useSelector, useDispatch } from "react-redux";
import { selectUserState } from "../authentication/redux/userReducer";
import { Avatar } from "./Avatar";
import { push } from "connected-react-router";

export const Header = React.memo(() => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();
  return (
    <GrHeader background="brand" pad="medium" height="xsmall">
      <Button
        onClick={() => {
          dispatch(push("/"));
        }}
      >
        <Heading level="3" margin="none">
          Parrrot
        </Heading>
      </Button>
      {user.profileImage != null && (
        <Avatar url={`url(${user.profileImage.url})`} />
      )}
    </GrHeader>
  );
});
