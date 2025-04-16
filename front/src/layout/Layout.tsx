import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    padding: 2rem;
    background-color: #f1f5f9;
`;

const Layout = () => {
    return (
        <Wrapper>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
