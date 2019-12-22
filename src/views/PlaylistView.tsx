import React from "react";
import { match } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylist,
  selectPlaylist
} from "../components/playlists/redux/playlistsReducer";
import { RootState } from "../types/RootState";
import { Heading, Box } from "grommet";
import { TrackList } from "../components/playlists/TrackListTable";

interface Props {
  match: match<{ id: string }>;
}

export const PlaylistView = React.memo(({ match }: Props) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const playlist = useSelector((state: RootState) => selectPlaylist(state, id));

  React.useEffect(() => {
    dispatch(getPlaylist(id));
  }, [dispatch, id]);
  return (
    <div>
      {playlist && (
        <>
          <Heading level="1">{playlist.name}</Heading>
          <Box animation={{ delay: 250, type: "fadeIn" }}>
            <TrackList tracks={playlist.tracks.items} />
          </Box>
        </>
      )}
    </div>
  );
});
