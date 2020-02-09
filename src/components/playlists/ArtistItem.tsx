import React from "react";
import { Text, Box } from "grommet";
import { Artist } from "../../types/Artist";
import { Avatar } from "../common/Avatar";
import { smallestImage } from "./smallestImage";

// TODO add default icon if no artists images
export const ArtistItem = React.memo(
  ({ artist, onClick }: { artist: Artist; onClick?: () => void }) => (
    <Box pad="small" align="center" direction="row" onClick={onClick}>
      {artist.images !== undefined && artist.images.length > 0 && (
        <Avatar url={`url(${smallestImage(artist.images).url})`} />
      )}
      <Box margin={{ left: "small" }}>
        <Text truncate size="medium">
          {artist.name}
        </Text>
        <Text color="dark-3">Artist</Text>
      </Box>
    </Box>
  )
);
