// src/components/Modal.tsx
import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    top: 20%;
    left: 30%;
    background-color: white;
    padding: 1rem;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
`;

export const ModalForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ModalButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ModalLabelLin = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalLabelCol = styled.label`
    display: flex;
    flex-direction: column;
`;
