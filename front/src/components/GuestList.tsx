// src/components/GuestList.tsx
import React from "react";
import styled from "styled-components";

type Guest = {
    id: string;
    name: string;
    email: string;
    status: "accepted" | "declined" | "pending";
};

interface GuestListProps {
    guests: Guest[];
    onStatusChange: (
        guestId: string,
        status: "accepted" | "declined" | "pending"
    ) => void;
}

// 🌟 STYLES
const Wrapper = styled.div`
    margin-top: 2rem;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const GuestItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    border: 1px solid #eee;
    border-radius: 6px;
`;

const GuestInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Select = styled.select`
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Label = styled.label`
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
`;

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

// 🧱 COMPONENT
const GuestList: React.FC<GuestListProps> = ({ guests, onStatusChange }) => {
    return (
        <Wrapper>
            <Title>Liste des invités</Title>
            <ul>
                {guests.map((guest) => (
                    <GuestItem key={guest.id}>
                        <GuestInfo>
                            <span>
                                {guest.name || "Inconnu"} — {guest.email}
                            </span>
                        </GuestInfo>

                        <StatusContainer>
                            <Label htmlFor={`status-${guest.id}`}>Statut</Label>
                            <Select
                                id={`status-${guest.id}`}
                                value={guest.status}
                                onChange={(e) =>
                                    onStatusChange(
                                        guest.id,
                                        e.target.value as
                                            | "accepted"
                                            | "declined"
                                            | "pending"
                                    )
                                }
                            >
                                <option value="pending">⏳ En attente</option>
                                <option value="accepted">✅ Accepté</option>
                                <option value="declined">❌ Refusé</option>
                            </Select>
                        </StatusContainer>
                    </GuestItem>
                ))}
            </ul>
        </Wrapper>
    );
};

export default GuestList;
