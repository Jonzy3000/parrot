import { UserSession } from "../components/authentication/redux/userSessionReducer";
import { User } from "./User";

export interface RootState {
  userState: User;
  userSessionState: UserSession;
}
