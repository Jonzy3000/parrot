import React from "react";
import { Text, Box, Heading } from "grommet";

export const PlaylistFormHeader = () => (
  <Box margin={{ bottom: "small" }}>
    <Heading level="2" margin={{ bottom: "none" }}>
      Create a playlist
    </Heading>
    <Text>
      Automatically generate a playlist based on suggested artists and songs
    </Text>
  </Box>
);
