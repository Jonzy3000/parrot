import React from "react";
import {
  Text,
  Box,
  Grid,
  DataTable,
  ResponsiveContext,
  InfiniteScroll
} from "grommet";
import { Track } from "../../types/Track";
import { Clock } from "grommet-icons";

const toMMSS = (ms: number) => {
  let date = new Date(ms);
  var mm = date.getUTCMinutes();
  var ss = date.getUTCSeconds();
  return (mm < 10 ? `0${mm}` : mm) + ":" + (ss < 10 ? `0${ss}` : ss);
};

export const TrackList = React.memo(({ tracks }: { tracks?: Track[] }) => {
  const size = React.useContext(ResponsiveContext);

  return size === "small" || size === "medium" ? (
    <TrackListCard tracks={tracks} />
  ) : (
    <TrackListTable tracks={tracks} />
  );
});

const TrackListTable = React.memo(({ tracks }: { tracks?: Track[] }) => (
  <DataTable
    columns={[
      {
        property: "name",
        header: <Text weight="bold">Title</Text>,
        primary: false,
        render: (test: Track) => <Text>{test.name}</Text>
      },
      {
        property: "artists.combinedLabel",
        header: <Text weight="bold">Artists</Text>,
        render: (test: Track) => <Text>{test.artists.combinedLabel}</Text>
      },
      {
        property: "album.name",
        header: <Text weight="bold">Album</Text>,
        render: (test: Track) => <Text>{test.album.name}</Text>
      },
      {
        property: "duration",
        header: <Clock color="dark-1" />,
        render: (test: Track) => <Text>{toMMSS(test.durationMs)}</Text>
      }
    ]}
    border={{
      header: { color: "none" },
      body: { color: "accent-2", side: "bottom" }
    }}
    data={tracks}
    pad="small"
  ></DataTable>
));

const TrackListCard = React.memo(({ tracks }: { tracks?: Track[] }) => (
  <Box>
    <InfiniteScroll items={tracks}>
      {(track, index) => (
        <Box
          pad="medium"
          key={track.id + index}
          border={{ color: "accent-2", side: "bottom" }}
        >
          <Grid gap="small" justifyContent="between" columns={["auto", "auto"]}>
            <Box>
              <Text truncate={true} size="large">
                {track.name}
              </Text>
              <Text truncate={true} color="dark-2" size="medium">
                {track.artists.combinedLabel} - {track.album.name}
              </Text>
            </Box>
            <Box alignSelf="center">
              <Text truncate={true} margin="none">
                {toMMSS(track.durationMs)}
              </Text>
            </Box>
          </Grid>
        </Box>
      )}
    </InfiniteScroll>
  </Box>
));
