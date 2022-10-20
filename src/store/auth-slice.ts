import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
	email?: string | null;
	photoURL?: string | null;
	phoneNumber?: string | null;
	displayName?: string | null;
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
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
