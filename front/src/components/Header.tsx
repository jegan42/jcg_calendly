// src/components/Header.tsx
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { LoggoutButton } from "./Button";

const Nav = styled.nav`
    background: #1e293b;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 1rem;

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

    const handleLogout = async () => {
        await axiosInstance.get("/auth/logout");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Nav>
            <h1>Calendly</h1>
            <NavLinks>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profil</Link>
                <Link to="/calendar">Calendrier</Link>
                <Link to="/events">Événements</Link>
                <Link to="/event/new">Créer</Link>

                <LoggoutButton onClick={handleLogout}>
                    Déconnexion
                </LoggoutButton>
            </NavLinks>
        </Nav>
    );
};

export default Header;
