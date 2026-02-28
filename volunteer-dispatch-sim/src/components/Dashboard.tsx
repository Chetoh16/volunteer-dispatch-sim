import { useMemo, useState } from "react";
import { makeVolunteerList, type Volunteer } from "../data/volunteers";
import { VolunteerCard } from "./VolunteerCard";

export default function Dashboard() {
    const initial = useMemo(() => makeVolunteerList(12, 123), []);
    const [volunteers, setVolunteers] = useState<Volunteer[]>(initial);

    function handleThumbsUp(id: string) {
        setVolunteers(prev =>
            prev.map(v =>
                v.id === id
                    ? { ...v, level_of_experience: v.level_of_experience + 1 }
                    : v
            )
        );
    }

    function handleOpenProfile(id: string) {
        alert(`Open profile: ${id}`);
    }

    return (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {volunteers.map(v => (
                <VolunteerCard
                    key={v.id}
                    volunteer={v}
                    onThumbsUp={handleThumbsUp}
                    onOpenProfile={handleOpenProfile}
                />
            ))}
        </div>
    );
}