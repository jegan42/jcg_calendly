// src/pages/Profile.tsx
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  margin: 0.5rem 0;
  font-size: 1.2rem;
`;

type User = {
    name: string;
    email: string;
    avatar: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const { data } = await axiosInstance.get("/auth/me");
              setUser(data.user);
          } catch (error) {
              console.error("Erreur lors de la récupération du profil :", error);
          }
      };

      fetchProfile();
  }, []);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <Wrapper>
      <h2>Mon Profil</h2>
      <Avatar src={user.avatar} alt={user.name} />
      <Info>👤 {user.name}</Info>
      <Info>📧 {user.email}</Info>
    </Wrapper>
  );
};

export default Profile;
