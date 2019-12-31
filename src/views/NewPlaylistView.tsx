import React from "react";
import { PlaylistForm } from "../components/playlists/PlaylistForm";
import { Box } from "grommet";

export const NewPlaylistView = React.memo(() => {
  return (
    <Box fill="horizontal" align="center">
      <Box width="large">
        <PlaylistForm />
      </Box>
    </Box>
  );
});
