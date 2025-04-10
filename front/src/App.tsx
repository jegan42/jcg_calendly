// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axiosInstance from './services/axios';  // Assure-toi que ce fichier est bien configuré
import { Home, Login, Dashboard } from './pages';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {

//   // Vérification si l'utilisateur est déjà authentifié (c'est-à-dire s'il a un cookie JWT)
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosInstance.get("/auth/me"); // Appel pour vérifier l'authentification
//         if (data?.user) {
//           // Si l'utilisateur est authentifié, rediriger vers le dashboard
//           navigate("/dashboard");
//         }
//       } catch (err) {
//         console.log("Aucune session trouvée");
//       }
//     };

//     fetchUser();
//   }, [navigate]); // Assure-toi que `navigate` est disponible ici
  const token = useAuth(); 

  console.log("token dans App [", token, "]");

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
};

export default App;
