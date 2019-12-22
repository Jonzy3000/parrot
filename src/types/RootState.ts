import { UserSession } from "../components/authentication/redux/userSessionReducer";
import { UserState } from "./User";
import { PlaylistState } from "./PlaylistState";
import { RouterState } from "connected-react-router";

export interface RootState {
  userState: UserState;
  userSessionState: UserSession;
  playlistsState: PlaylistState;
  router: RouterState;
}
