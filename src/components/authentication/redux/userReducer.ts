import { UserProfile } from "./../../../services/spotifyApi/userProfile";
import { RootState } from "./../../../types/RootState";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { User, UserState } from "../../../types/User";

export const selectUserState = (state: RootState): UserState => state.userState;

const userSlice = createSlice({
  name: "user",
  initialState: { isLoading: true } as UserState,
  reducers: {
    storeUser: (_: UserState, action: PayloadAction<User>) => ({
      isLoading: false,
      ...action.payload
    }),
    fetchingUser: (state: UserState) => {
      state.isLoading = true;
    }
  }
});

const getUser = () => async (dispatch: Dispatch) => {
  dispatch(userSlice.actions.fetchingUser());
  const user = await UserProfile.getCurrentUserProfile();
  dispatch(storeUser(user));
};

export default userSlice.reducer;

const { storeUser } = userSlice.actions;
export { storeUser, getUser };
