import { UserProfile } from "./../../../services/spotifyApi/userProfile";
import { RootState } from "./../../../types/RootState";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { User } from "../../../types/User";

export const selectUserState = (state: RootState): User => state.userState;

const userSlice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    storeUser: (_: User, action: PayloadAction<User>) => action.payload
  }
});

const getUser = () => async (dispatch: Dispatch) => {
  const user = await UserProfile.getCurrentUserProfile();
  dispatch(storeUser(user));
};

export default userSlice.reducer;

const { storeUser } = userSlice.actions;
export { storeUser, getUser };
