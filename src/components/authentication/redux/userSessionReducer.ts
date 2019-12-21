import { RootState } from "./../../../types/RootState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSession {
  isAuthenticated: boolean;
  token?: string;
  expiresAt?: number;
}

export const selectUserSessionState = (state: RootState): UserSession =>
  state.userSessionState;

const userSessionSlice = createSlice({
  name: "userSession",
  initialState: {
    isAuthenticated: false
  } as UserSession,
  reducers: {
    storeUserSession: (
      _: UserSession,
      action: PayloadAction<{ token: string; expirestAt: number }>
    ) => ({
      isAuthenticated: true,
      token: action.payload.token,
      expiresAt: action.payload.expirestAt
    })
  }
});

export default userSessionSlice.reducer;

const { storeUserSession } = userSessionSlice.actions;
export { storeUserSession };
