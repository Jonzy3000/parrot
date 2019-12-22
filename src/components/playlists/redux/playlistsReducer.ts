import { RootState } from "./../../../types/RootState";
import { Playlist } from "./../../../types/Playlist";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Playlists } from "../../../services/spotifyApi/playlists";
import { PlaylistState } from "../../../types/PlaylistState";

export const selectPlaylists = (state: RootState) =>
  Object.values(state.playlistsState.byId);

export const selectPlaylistsIds = (state: RootState) =>
  Object.keys(state.playlistsState.byId);

export const selectPlaylist = (state: RootState, playlistId: string) =>
  state.playlistsState.byId[playlistId];

const playlistSlice = createSlice({
  name: "playlists",
  initialState: { byId: {} } as PlaylistState,
  reducers: {
    storePlaylists: (_: PlaylistState, action: PayloadAction<Playlist[]>) => ({
      byId: action.payload.reduce(
        (acc: { [key: string]: Playlist }, current) => {
          acc[current.id] = current;
          return acc;
        },
        {}
      )
    })
  }
});

export default playlistSlice.reducer;

const getPlaylists = () => async (dispatch: Dispatch) => {
  const playlists = await Playlists.getUserPlaylists();
  dispatch(storePlaylists(playlists));
};

const { storePlaylists } = playlistSlice.actions;
export { storePlaylists, getPlaylists };
