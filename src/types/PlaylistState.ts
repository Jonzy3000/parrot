import { Playlist } from "./Playlist";
export interface PlaylistState {
  byId: {
    [key: string]: Playlist;
  };
}
