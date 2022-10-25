import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignInUp from "./pages/SignInUp";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { authActions, UserType } from "./store/auth-slice";
import Profile from "./pages/Profile";

export enum Paths {
	SIGN_UP = "/signup",
	SIGN_IN = "/signin",
	PROFILE = "/profile",
}

function App() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) navigate(Paths.PROFILE, { replace: true });
			const currentUser: UserType | null = user
				? {
						email: user?.email,
						photoURL: user?.photoURL,
						phoneNumber: user?.phoneNumber,
						displayName: user?.displayName,
						uid: user?.uid,
				  }
				: null;
			dispatch(authActions.setCurrentUser(currentUser));
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	if (isLoading) return <div></div>;

	return (
		<Container>
			<Routes>
				<Route path="/" element={<Navigate to={Paths.SIGN_UP} />} />
				<Route path={Paths.SIGN_UP} element={<SignInUp />} />
				<Route path={Paths.SIGN_IN} element={<SignInUp />} />
				{user && <Route path={Paths.PROFILE} element={<Profile />} />}
				<Route path="/*" element={<Navigate to={Paths.SIGN_IN} />} />
			</Routes>
		</Container>
	);
}

export default App;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
`;
