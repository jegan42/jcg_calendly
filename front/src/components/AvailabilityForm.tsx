// front/src/components/AvailabilityForm.tsx
import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./Button";

interface Props {
    onSubmit: (data: {
        day_of_week: string;
        start_time: string;
        end_time: string;
    }) => void;
    initialData?: { day_of_week: string; start_time: string; end_time: string };
    buttonLabel?: string;
}

const AvailabilityForm: React.FC<Props> = ({
    onSubmit,
    initialData,
    buttonLabel = "Enregistrer",
}) => {
    const [day, setDay] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setDay(initialData.day_of_week);
            setStart(initialData.start_time);
            setEnd(initialData.end_time);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!day || !start || !end) {
            setError("Please fill out all fields.");
            return;
        }

        if (start >= end) {
            setError("Start time must be before end time.");
            return;
        }

        onSubmit({ day_of_week: day, start_time: start, end_time: end });

        if (!initialData) {
            setDay("");
            setStart("");
            setEnd("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="day">Jour (ex: lundi) :</label>
            <Input
                id="day"
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
            />
            <Input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
            />
            <Input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">{buttonLabel}</Button>
        </form>
    );
};

export default AvailabilityForm;
