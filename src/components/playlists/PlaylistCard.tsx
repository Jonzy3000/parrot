import React from "react";
import { useSelector } from "react-redux";
import { selectPlaylist } from "./redux/playlistsReducer";
import { RootState } from "../../types/RootState";
import { Box, Image, Heading, Text } from "grommet";

interface Props {
  id: string;
}

export const PlaylistCard = React.memo(({ id }: Props) => {
  const playlist = useSelector((state: RootState) => selectPlaylist(state, id));
  return (
    <Box round="small" elevation="medium" overflow="hidden">
      <Box height="small">
        {playlist.images[0] && (
          <Image src={playlist.images[0].url} fit="cover" />
        )}
      </Box>
      <Box pad="medium" justify="center">
        <Heading level="2" color="dark-1" margin={{ bottom: "xsmall" }}>
          {playlist.name}
        </Heading>
        <Text weight={100} size="large">
          {playlist.owner.name}
        </Text>
      </Box>
    </Box>
  );
});
