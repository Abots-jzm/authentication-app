import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import LogoSVG from "../assets/devchallenges.svg";
import NoProfilePic from "../assets/no-profile-pic.jpg";
import { useAppSelector } from "../store/hooks";
import { auth } from "../utils/firebase";

export default function Profile() {
	const user = useAppSelector((state) => state.user);
	const userProfilePhoto = user?.photoURL || NoProfilePic;

	async function logout(e: React.MouseEvent) {
		e.preventDefault();
		await signOut(auth);
	}

	return (
		<div>
			<Header>
				<img src={LogoSVG} alt="logo" />
				<MyProfile>
					<div className="profile-pic">
						<img src={userProfilePhoto} alt="profile pic" />
					</div>
					{user?.displayName && <div className="name">{user?.displayName}</div>}
					<div className="icon">
						<span className="material-symbols-outlined">arrow_drop_down</span>
					</div>
				</MyProfile>
			</Header>
			<Layout>
				<div className="header-title">Personal info</div>
				<div className="header-description">Basic info, like your name and photo</div>
				<ProfileTable>
					<div className="head">
						<div className="left">
							<div className="title">Profile</div>
							<div className="description">Some info may be visible to other people</div>
						</div>
						<div className="right">Edit</div>
					</div>
					<div>
						<div className="table-left">photo</div>
						<div className="table-right">
							<div className="pic">
								<img src={userProfilePhoto} alt="profile pic" />
							</div>
						</div>
					</div>
					<div>
						<div className="table-left">name</div>
						<div className="table-right">{user?.displayName || "-"}</div>
					</div>
					<div>
						<div className="table-left">bio</div>
						<div className="table-right">{user?.bio || "-"}</div>
					</div>
					<div>
						<div className="table-left">phone</div>
						<div className="table-right">{user?.phoneNumber || "-"}</div>
					</div>
					<div>
						<div className="table-left">email</div>
						<div className="table-right">{user?.email || "-"}</div>
					</div>
					<div>
						<div className="table-left">password</div>
						<div className="table-right">{user?.password ? "*".repeat(user?.password?.length) : "-"}</div>
					</div>
				</ProfileTable>
			</Layout>
			<div onClick={logout}>log out</div>
		</div>
	);
}

const ProfileTable = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 4.4rem;

	.table-left {
		padding-block: 2.7rem;
		text-transform: uppercase;
		color: #bdbdbd;
		font-weight: 500;
		font-size: 1.3rem;
		flex: 1;
	}

	.table-right {
		flex: 2;
		font-size: 1.8rem;
		font-weight: 500;
		color: #333333;
	}

	.pic {
		height: 7.2rem;
		width: 7.2rem;
		object-fit: cover;
		border-radius: 1.2rem;
		margin: 1.5rem 0;
		overflow: hidden;

		img {
			width: 100%;
			object-fit: cover;
		}
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 2.8rem;

		.right {
			border: 1px solid #828282;
			border-radius: 1.2rem;
			padding: 0.8rem 3.3rem;
			font-weight: 500;
			color: #828282;
			cursor: pointer;
		}

		.title {
			font-size: 2.4rem;
		}

		.description {
			font-size: 1.3rem;
			font-weight: 500;
			color: #828282;
		}
	}

	& > :first-child {
		border-radius: 1.2rem 1.2rem 0 0;
	}

	& > :last-child {
		border-radius: 0 0 1.2rem 1.2rem;
	}

	& > * {
		border: 1px solid #e0e0e0;
		padding-inline: 4.9rem;
		display: flex;
		align-items: center;

		&:not(:first-child) {
			border-top: none;
		}
	}
`;

const Layout = styled.div`
	max-width: 85rem;
	margin: 0 auto;
	margin-bottom: 10rem;

	.header-title {
		margin-top: 4.5rem;
		text-align: center;
		font-size: 3.6rem;
	}

	.header-description {
		text-align: center;
		font-size: 1.8rem;
		font-weight: 300;
	}
`;

const MyProfile = styled.div`
	display: flex;
	align-items: center;
	gap: 1.3rem;

	.profile-pic {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 1.2rem;
		overflow: hidden;
		object-fit: cover;

		img {
			object-fit: cover;
			width: 100%;
		}
	}

	.name {
		font-size: 1.2rem;
		font-weight: 700;
		color: #333333;
	}

	.icon span {
		font-size: 2.2rem;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2.4rem;
`;
