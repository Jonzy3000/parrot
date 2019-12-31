import React from "react";
import { Button, Box } from "grommet";
import { Music } from "grommet-icons";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export const NewPlaylistButton = React.memo(() => {
  const dispatch = useDispatch();
  return (
    <Box height="xxsmall" margin={{ bottom: "large" }}>
      <Button
        reverse={true}
        icon={<Music />}
        label="Make me a playlist"
        fill={true}
        onClick={() => dispatch(push("/new-playlist"))}
      />
    </Box>
  );
});
