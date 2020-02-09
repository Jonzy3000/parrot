import React from "react";
import { Text, Box } from "grommet";
import { Track } from "../../types/Track";
import { SquareAvatar } from "../common/Avatar";
import { smallestImage } from "./smallestImage";
// TODO add default icon if no album images
export const TrackItem = React.memo(
  ({ track, onClick }: { track: Track; onClick?: () => void }) => (
    <Box pad="small" align="center" direction="row" onClick={onClick}>
      <SquareAvatar url={`url(${smallestImage(track.album.images).url})`} />
      <Box margin={{ left: "small" }}>
        <Text truncate size="medium">
          {track.name}
        </Text>
        <Text truncate color="dark-3">
          Song - {track.artists.combinedLabel}
        </Text>
      </Box>
    </Box>
  )
);
