import React from "react";
import { Welcome } from "../components/home/Welcome";
import { PlaylistLists } from "../components/playlists/PlaylistList";
import { Box } from "grommet";

export const Home = React.memo(() => {
  return (
    <Box>
      <Welcome />
      <PlaylistLists />
    </Box>
  );
});
