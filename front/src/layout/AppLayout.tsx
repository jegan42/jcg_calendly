// src/layout/AppLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
