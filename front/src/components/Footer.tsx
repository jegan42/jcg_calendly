import styled from "styled-components";

const FooterContainer = styled.footer`
    background: #1e293b;
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
`;

const Footer = () => {
    return (
        <FooterContainer>
            © {new Date().getFullYear()} Calendly Clone — Tous droits réservés
        </FooterContainer>
    );
};

export default Footer;
