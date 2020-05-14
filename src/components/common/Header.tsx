import React from "react";
import { Header as GrHeader, Heading, Button, Box} from "grommet";
import { User } from 'grommet-icons'
import { useSelector, useDispatch } from "react-redux";
import { selectUserState } from "../authentication/redux/userReducer";
import { Avatar } from "./Avatar";
import { push } from "connected-react-router";
export const Header = React.memo(() => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();
  console.log(user.profileImage?.url)
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
      <Avatar url={user.profileImage?.url} />
    </GrHeader>
  );
});
