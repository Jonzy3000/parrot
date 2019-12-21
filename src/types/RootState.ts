import { UserSession } from "../components/authentication/redux/userSessionReducer";
import { UserState } from "./User";

export interface RootState {
  userState: UserState;
  userSessionState: UserSession;
}
