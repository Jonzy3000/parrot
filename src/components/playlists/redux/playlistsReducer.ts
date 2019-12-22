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
    }),
    storePlaylist: (
      state: PlaylistState,
      { payload }: PayloadAction<Playlist>
    ) => {
      state.byId[payload.id] = payload;
    }
  }
});

export default playlistSlice.reducer;

const getPlaylists = () => async (dispatch: Dispatch) => {
  const playlists = await Playlists.getUserPlaylists();
  dispatch(storePlaylists(playlists));
};

const getPlaylist = (id: string) => async (dispatch: Dispatch) => {
  const playlist = await Playlists.getPlaylist(id);
  dispatch(storePlaylist(playlist));
};

const { storePlaylists, storePlaylist } = playlistSlice.actions;
export { storePlaylists, getPlaylists, storePlaylist, getPlaylist };
