// src/pages/Login.tsx
import React from "react";
import styled from "styled-components";

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LoginButton = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    background-color: #4285f4;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #357ae8;
    }
`;

const Login: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    };

    return (
        <LoginWrapper>
            <h2>Connexion</h2>
            <LoginButton onClick={handleGoogleLogin}>
                Se connecter avec Google
            </LoginButton>
        </LoginWrapper>
    );
};

export default Login;
