import React from "react";
import { Box } from "grommet";
import { PlaylistFormWrapper } from "../components/playlists/PlaylistFormWrapper";

export const NewPlaylistView = React.memo(() => {
  return (
    <Box fill="horizontal" align="center">
      <Box width="large">
        <PlaylistFormWrapper />
      </Box>
    </Box>
  );
});
