import { PlaylistForm } from "./PlaylistForm";
import React from "react";
import { Box, ResponsiveContext } from "grommet";
import { PlaylistFormHeader } from "./PlaylistFormHeader";

export const PlaylistFormWrapper = React.memo(() => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box>
      <PlaylistFormHeader />
      {size === "small" ? (
        <Box margin={{ top: "small" }}>
          <PlaylistForm />
        </Box>
      ) : (
        <Box
          elevation="large"
          pad={{ vertical: "large", horizontal: "xlarge" }}
          round="small"
        >
          <PlaylistForm />
        </Box>
      )}
    </Box>
  );
});
