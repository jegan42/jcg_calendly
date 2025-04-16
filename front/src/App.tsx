// src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    Availability,
    Calendar,
    CreateEvent,
    Dashboard,
    EventDetail,
    EventEdit,
    EventForm,
    EventPage,
    Events,
    GuestResponse,
    Home,
    Login,
    Logout,
    NotFound,
    Profile,
    PublicBooking,
    RecurringEvents,
    Unauthorized,
} from "./pages";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import AppLayout from "./layout/AppLayout";
import Layout from "./layout/Layout";

const App: React.FC = () => {
    const { token, loading } = useAuth();

    console.log("token dans App [", token, "]");

    if (loading)
        return <p style={{ textAlign: "center" }}>Chargement en cours...</p>;

    return (
        <>
            <Header />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />

                    <Route element={<AppLayout />}>
                        <Route path="/book/:slug" element={<PublicBooking />} />
                        <Route path="/response" element={<GuestResponse />} />
                        <Route
                            path="/availability"
                            element={<Availability />}
                        />
                        <Route
                            path="/recurringevents"
                            element={<RecurringEvents />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event"
                            element={
                                <ProtectedRoute>
                                    <Events />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/create"
                            element={
                                <ProtectedRoute>
                                    <CreateEvent />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/new"
                            element={
                                <ProtectedRoute>
                                    <EventForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/:id"
                            element={
                                <ProtectedRoute>
                                    <EventDetail />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/preview/:id"
                            element={
                                <ProtectedRoute>
                                    <EventPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EventEdit />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/calendar"
                            element={
                                <ProtectedRoute>
                                    <Calendar />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/logout"
                            element={<Logout />} // Route pour déconnexion
                        />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/44" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
