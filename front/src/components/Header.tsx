// src/components/Header.tsx
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState } from "../redux/store";
import { LoggoutButton, Button } from "./Button";

const Nav = styled.nav`
    background: #1e293b;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

    a {
        color: white;
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    const handleLogout = async () => {
        try {
            await axiosInstance.get("/auth/logout");
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error("Erreur lors de la déconnexion :", err);
        }
    };

    return (
        <Nav>
            <Link
                to="/"
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                }}
            >
                🗓️ Calendly
            </Link>

            <NavLinks>
                {token && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profil</Link>
                        <Link to="/calendar">Calendrier</Link>
                        <Link to="/event">Événements</Link>
                        <Link to="/event/new">Créer</Link>
                        <LoggoutButton onClick={handleLogout}>
                            Déconnexion
                        </LoggoutButton>
                    </>
                )}
            </NavLinks>
        </Nav>
    );
};

export default Header;
