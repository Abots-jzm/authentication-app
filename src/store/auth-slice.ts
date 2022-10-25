import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
	photoURL?: string | null;
	displayName?: string | null;
	bio?: string | null;
	phoneNumber?: string | null;
	email?: string | null;
	password?: string | null;
	uid?: string | null;
}

type InitalState = {
	user: UserType | null;
};

const initialState: InitalState = {
	user: null,
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		setCurrentUser(state, action: PayloadAction<UserType | null>) {
			state.user = action.payload;
		},
		setPassword(state, action: PayloadAction<string>) {
			if (state.user) state.user.password = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
