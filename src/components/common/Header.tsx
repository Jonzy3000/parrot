import React from "react";
import { Header as GrHeader, Heading } from "grommet";
import { useSelector } from "react-redux";
import { selectUserState } from "../authentication/redux/userReducer";
import { Avatar } from "./Avatar";

export const Header = React.memo(() => {
  const user = useSelector(selectUserState);
  console.log(user);
  return (
    <GrHeader background="brand" pad="medium">
      <Heading level="3" margin="none">
        Parrrot
      </Heading>
      {!user.isLoading && <Avatar url={`url(${user.profileImage.url})`} />}
    </GrHeader>
  );
});
