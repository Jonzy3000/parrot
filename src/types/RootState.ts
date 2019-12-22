import { Playlist } from "./Playlist";
import { UserSession } from "../components/authentication/redux/userSessionReducer";
import { UserState } from "./User";
import { PlaylistState } from "./PlaylistState";

export interface RootState {
  userState: UserState;
  userSessionState: UserSession;
  playlistsState: PlaylistState;
}
