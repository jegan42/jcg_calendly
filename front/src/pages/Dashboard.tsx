import React from "react";
// import useAuth from "../hooks/useAuth";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Dashboard = () => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    console.log( "my value", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };
  
  const tokenTest = getCookie('token');
  console.log("tokenTest", tokenTest);

  // const token = useAuth(); // vérifie l'accès

  return (
    <Container>
      <Title>🎉 Bienvenue sur ton Dashboard</Title>
      <p>Tu es connecté avec un token JWT !</p>
      <p>Token: {tokenTest}</p>
    </Container>
  );
};

export default Dashboard;
