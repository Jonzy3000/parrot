import { RootState } from "./../../../types/RootState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  user?: User;
}

export interface User {
  name: string;
  token: string;
}

export const selectUserState = (state: RootState): UserState => state.userState;

const userSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false } as UserState,
  reducers: {
    storeUser: (state: UserState, action: PayloadAction<User>) => ({
      isAuthenticated: true,
      user: action.payload
    })
  }
});

export default userSlice.reducer;

const { storeUser } = userSlice.actions;
export { storeUser };
