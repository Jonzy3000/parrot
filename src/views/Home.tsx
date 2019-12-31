import React from "react";
import { Welcome } from "../components/home/Welcome";
import { PlaylistLists } from "../components/playlists/PlaylistList";
import { NewPlaylistButton } from "../components/playlists/NewPlaylistButton";
import { Box } from "grommet";

export const Home = React.memo(() => {
  return (
    <Box>
      <Welcome />
      <NewPlaylistButton />
      <PlaylistLists />
    </Box>
  );
});
