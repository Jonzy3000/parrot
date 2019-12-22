import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylists, selectPlaylistsIds } from "./redux/playlistsReducer";
import { Grid, Box } from "grommet";
import { PlaylistCard } from "./PlaylistCard";

export const PlaylistLists = React.memo(() => {
  const playlists = useSelector(selectPlaylistsIds);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPlaylists());
  }, [dispatch]);

  return (
    <div>
      <Grid gap="large" columns={"medium"}>
        {playlists.map((id, index) => (
          <Box
            key={id}
            animation={{ delay: 300 * (index + 1), type: "fadeIn" }}
          >
            <PlaylistCard id={id} />
          </Box>
        ))}
      </Grid>
    </div>
  );
});
