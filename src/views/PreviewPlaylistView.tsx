import React from "react";
import { Box, Heading, Text, Layer } from "grommet";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types/RootState";
import { TrackList } from "../components/playlists/TrackListTable";
import { Playlists } from "../services/spotifyApi/playlists";
import { Track } from "../types/Playlist";
import { push } from "connected-react-router";

export const PreviewPlaylistView = React.memo(() => {
  const dispatch = useDispatch();
  const playlistDetails = useSelector((state: RootState) => {
    return state.recommendationsState.playlistDetails;
  });

  const userId = useSelector((state: RootState) => {
    return state.userState.id;
  });

  const tracks = useSelector((state: RootState) => {
    return state.recommendationsState.tracks;
  });

  const handleClick = () => {
    Playlists.createPlaylist(
      playlistDetails,
      tracks as Track[],
      userId
    ).then(id => dispatch(push(`/playlists/${id}`)));
  };

  return playlistDetails ? (
    <>
      <Text size="large" color="dark-3">
        Previewing Playlist
      </Text>
      <Heading level="1">{playlistDetails.name}</Heading>
      <Box fill="horizontal" align="center">
        {tracks && (
          <>
            <TrackList tracks={tracks} />
            <Layer position="bottom" full="horizontal" modal={false}>
              <Box
                background="accent-2"
                onClick={handleClick}
                hoverIndicator="accent-3"
                pad="small"
                justify="center"
                fill="horizontal"
                align="center"
              >
                <Text>Make this playlist</Text>
              </Box>
            </Layer>
          </>
        )}
      </Box>
    </>
  ) : (
    <Box align="center" justify="center" fill>
      <Heading level="1">Ooops something when wrong</Heading>
    </Box>
  );
});
