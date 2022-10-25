import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../App";
import LogoSVG from "../assets/devchallenges.svg";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/auth-slice";

export default function SignInUp() {
	const location = useLocation();
	const [path, setpath] = useState(location.pathname);
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setpath(location.pathname);
		setError("");
		setEnteredEmail("");
		setEnteredPassword("");
	}, [location.pathname]);

	async function signInUp(e: React.FormEvent) {
		e.preventDefault();

		if (enteredPassword.length < 6 && path === Paths.SIGN_UP) return setError("Password must be longer than 6 characters");

		try {
			setError("");
			setIsLoading(true);

			if (path === Paths.SIGN_UP) await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
			else await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
			console.log("yo");
		} catch (error: any) {
			console.log("yo");

			setError(error.message);
		} finally {
			setEnteredEmail("");
			dispatch(authActions.setPassword(enteredPassword));
			setEnteredPassword("");
			setIsLoading(false);
		}
	}

	return (
		<Layout>
			<FormCard>
				<img src={LogoSVG} alt="logo" />
				<Top>
					{path === Paths.SIGN_UP && <h3>Join thousands of learners from around the world</h3>}
					{path === Paths.SIGN_UP && <p>Master web development by making real life projects. There are multiple paths for you to choose</p>}
					{path === Paths.SIGN_IN && <h3>Login</h3>}
				</Top>
				<Form onSubmit={signInUp}>
					<div className="field">
						<label htmlFor="email">
							<span className="material-symbols-outlined">mail</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="email"
							placeholder="Email"
							value={enteredEmail}
							onChange={(e) => setEnteredEmail(e.target.value)}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="password">
							<span className="material-symbols-outlined">lock</span>
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="password"
							placeholder="Password"
							value={enteredPassword}
							onChange={(e) => setEnteredPassword(e.target.value)}
							required
						/>
					</div>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<button type="submit" disabled={isLoading}>
						{path === Paths.SIGN_UP ? "Start coding now" : "login"}
					</button>
				</Form>
				<Other>
					<p>or continue with these social profile</p>
					{path === Paths.SIGN_UP && (
						<p>
							Already a member?
							<Link to={Paths.SIGN_IN}>
								<span className="login">Login</span>
							</Link>
						</p>
					)}
					{path === Paths.SIGN_IN && (
						<p>
							Don't have an account yet?
							<Link to={Paths.SIGN_UP}>
								<span className="login">Register</span>
							</Link>
						</p>
					)}
				</Other>
			</FormCard>
		</Layout>
	);
}

const ErrorMessage = styled.div`
	padding: 1rem 2rem;
	border-radius: 0.8rem;
	background-color: pink;
	color: red;
`;

const Other = styled.div`
	text-align: center;

	p {
		margin-top: 2.9rem;
		color: #828282;
		font-size: 1.4rem;

		a,
		a:link,
		a:visited {
			text-decoration: none;
		}

		.login {
			color: #2d9cdb;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	button {
		margin-top: 0.8rem;
		background-color: #2f80ed;
		border-radius: 0.8rem;
		padding: 0.8rem 0;
		color: white;
		border: none;
		font: inherit;
		cursor: pointer;
		font-weight: 600;

		@media screen {
			&:hover {
				background-color: #5f9ff1;
			}
		}
	}

	.field {
		position: relative;
	}

	label {
		position: absolute;
		color: #828282;
		top: 1.4rem;
		left: 1.4rem;
	}

	input {
		padding: 1.3rem;
		padding-left: 4.7rem;
		font-size: inherit;
		font: inherit;
		border: 1px solid #bdbdbd;
		border-radius: 0.8rem;
		width: 100%;
	}
`;

const Top = styled.div`
	color: #333333;
	margin-bottom: 3.4rem;

	h3 {
		font-size: 1.8rem;
		font-weight: 600;
		margin: 3.3rem 0 1.4rem;
	}
`;

const FormCard = styled.div`
	padding: 4.8rem 5.8rem;
	border: 1px solid #bdbdbd;
	border-radius: 2.4rem;
`;

const Layout = styled.div`
	min-height: 100vh;
	max-width: 47rem;
	margin: 0 auto;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
