// src/context/ToastContext.tsx
import React, { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';

interface ToastContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const showSuccess = (message: string) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showError = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToastContext = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};
