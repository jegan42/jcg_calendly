// src/components/Modal.tsx
import styled from "styled-components";

export const Modal = styled.div`
    position: fixed,
    top: 20%,
    left: 30%,
    backgroundColor: white,
    padding: 1rem,
    zIndex: 1000,
    boxShadow: 0 0 20px rgba(0,0,0,0.2),
    borderRadius: 8px,
`;

export const ModalLabelLin = styled.label`
    display: flex;
    justifyContent: space-between,
    alignItems: center,
    marginBottom: 1rem,
`;

export const ModalLabelCol = styled.label`
    display: flex;
    flexdirection: column;
`;

