// front/src/pages/Availability.tsx
import React, { useEffect, useState } from "react";
import {
    getAvailabilities,
    addAvailability,
    deleteAvailability,
    updateAvailability,
} from "../services/availabilityService";
import AvailabilityForm from "../components/AvailabilityForm";
import { Button } from "../components/Button";

const AvailabilityPage = () => {
    const [availabilities, setAvailabilities] = useState<any[]>([]);
    const [editing, setEditing] = useState<any | null>(null);

    const fetchData = async () => {
        const data = await getAvailabilities();
        setAvailabilities(data);
    };

    const handleAdd = async (data: {
        day_of_week: string;
        start_time: string;
        end_time: string;
    }) => {
        await addAvailability(data);
        fetchData();
    };

    const handleUpdate = async (data: {
        day_of_week: string;
        start_time: string;
        end_time: string;
    }) => {
        if (!editing) return;
        await updateAvailability(editing.id, data);
        setEditing(null);
        fetchData();
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("❗ Supprimer cette disponibilité ?");
        if (!confirm) return;

        await deleteAvailability(id);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>🕒 Mes disponibilités</h2>

            {availabilities.length === 0 ? (
                <p>Aucune disponibilité enregistrée.</p>
            ) : (
                <ul style={{ paddingLeft: 0 }}>
                    {availabilities.map((a) => (
                        <li key={a.id} style={{ marginBottom: "0.5rem" }}>
                            {a.day_of_week} | {a.start_time} → {a.end_time}{" "}
                            <Button onClick={() => setEditing(a)}>✏️</Button>
                            <Button onClick={() => handleDelete(a.id)}>
                                🗑
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>{editing ? "Modifier" : "Ajouter"} un créneau</h3>
            <AvailabilityForm
                initialData={editing ?? undefined}
                onSubmit={editing ? handleUpdate : handleAdd}
                buttonLabel={editing ? "Mettre à jour" : "Ajouter"}
            />
        </div>
    );
};

export default AvailabilityPage;
