// src/components/Button.tsx
import styled from "styled-components";
import { theme as theme_front } from "../styles/theme";

export const Button = styled.button`
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: ${theme_front.colors.primary};
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

export const IconButton = styled(Button)`
    border: 1px solid ${theme_front.colors.primary};
    background-color: transparent;
`;

export const PrimaryButton = styled.button`
    padding: 0.75rem 1.25rem;
    background-color: ${theme_front.colors.primary};
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0041cc;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const LoggoutButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
`;

export const DeleteButton = styled(Button)`
    background-color: #e74c3c;
`;
