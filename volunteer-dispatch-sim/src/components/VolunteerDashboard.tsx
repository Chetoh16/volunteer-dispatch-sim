import { useEffect, useMemo, useRef, useState } from "react";
import { VolunteerCard } from "./VolunteerCard";

// Imports data + helper functions from data layer.
// - COURSE_ACRONYMS: maps course -> short label shown on the photo
// - VOLUNTEER_STATUS_LABEL: maps status -> user-friendly label
// - makeVolunteerList: generates volunteers 
// - scoreForExchange: scoring rule for completing an exchange
// - Volunteer / VolunteerStatus: TypeScript types used for safety
import {
    COURSE_ACRONYMS,
    VOLUNTEER_STATUS_LABEL,
    makeVolunteerList,
    type Volunteer,
    type VolunteerStatus,
} from "../data/volunteers";




// Props contract for the profile modal.
// In practice: this is the “full profile view” for one volunteer.
type ProfileModalProps = {
    volunteer: Volunteer;                          // The volunteer whose details are shown
    onClose: () => void;                           // Close the modal
    onThumbsUp: (volunteerId: number) => void;     // Same thumbs up action, but from inside the modal
    onCompleteExchange: (volunteerId: number) => void; // Adds score + exchange count
};

// Profile modal UI.
// In practice: opened by right-clicking (or selecting) a card.
function ProfileModal({ volunteer, onClose, onThumbsUp, onCompleteExchange }: ProfileModalProps) {
    return (
        <div
            // Fullscreen overlay behind the modal.
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"

            // Clicking the dark backdrop closes the modal (but clicking inside does not).
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            {/* Modal panel */}
            <div className="w-full max-w-lg rounded-xl border border-black/30 bg-[#0f1518] p-4 text-gray-100 shadow-lg">
                {/* Header (name + close button) */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="truncate text-lg font-semibold">{volunteer.name}</div>
                        <div className="mt-1 text-sm text-gray-300">
                            {volunteer.course} • Age {volunteer.age}
                        </div>
                        {volunteer.headline && (
                            <div className="mt-1 text-sm text-gray-300">{volunteer.headline}</div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-100 hover:bg-white/10"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                {/* Main info grid (status, exp, exchanges, score) */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                        <div className="text-xs text-gray-300">Status</div>
                        <div className="mt-1 font-semibold">
                            {VOLUNTEER_STATUS_LABEL[volunteer.status]}
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                        <div className="text-xs text-gray-300">Experience</div>
                        <div className="mt-1 flex items-center justify-between">
                            <div className="font-semibold">{volunteer.level_of_experience}</div>
                            {/* button to increase experience
                                <button
                                    type="button"
                                    className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
                                    onClick={() => onThumbsUp(volunteer.id)}
                                >
                                    👍 +1
                                </button>
                            */}

                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                        <div className="text-xs text-gray-300">Exchanges completed</div>
                        <div className="mt-1 font-semibold">{volunteer.exchanges_completed}</div>
                    </div>
                    
                    {/*
                        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                            <div className="text-xs text-gray-300">Volunteer score</div>
                            <div className="mt-1 font-semibold">{volunteer.score}</div>
                        </div>
                    */}

                </div>

                {/* “Complete exchange” action button.
                    In practice: simulates finishing an exchange; awards points based on current experience.

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="rounded-lg bg-emerald-600/90 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                        onClick={() => onCompleteExchange(volunteer.id)}
                    >
                        
                    </button>
                </div>

                */}

            </div>
        </div>
    );
}

// Formats elapsed seconds into MM:SS.
// In practice: shows the game timer at the top (e.g. 02:13).
function formatMMSS(totalSeconds: number) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return `${mm}:${ss}`;
}

// Main screen component.
// In practice: holds the game state (volunteers list, timer, modal open/close) and renders the UI.
export default function VolunteerDashboard({
    isSelecting,
    selectedVolunteerId,
    onSelectVolunteer,
    onAssignVolunteer
}: {
    isSelecting: boolean;
    selectedVolunteerId: number | null;
    onSelectVolunteer: (id: number) => void;
    onAssignVolunteer: (id: number, name:string) => void;
}) {
    // Generates a pool of 7 volunteers ONCE for the session.
    // In practice: you have 7 “possible” volunteers, but you start showing only 5.
    const allVolunteers = useMemo(() => makeVolunteerList(7, 123), []);

    // The active volunteers currently visible in the dashboard (starts with 5).
    const [volunteers, setVolunteers] = useState<Volunteer[]>(() => allVolunteers.slice(0, 5));

    // Which volunteer profile is currently open in the modal, by ID.
    const [profileId, setProfileId] = useState<number | null>(null);

    // Game timer in seconds since the dashboard mounted.
    const [elapsedSec, setElapsedSec] = useState(0);

    // “Gate” flags so each unlock happens only once.
    // useRef stores a mutable value that does not trigger re-renders.
    const unlocked2m = useRef(false);
    const unlocked4m = useRef(false);

    // Timer tick: increments elapsedSec every second.
    // In practice: drives the on-screen timer AND the timed unlocking logic.
    useEffect(() => {
        const id = window.setInterval(() => {
            setElapsedSec((t) => t + 1);
        }, 1000);

        // Cleanup: stops the interval if component unmounts.
        return () => window.clearInterval(id);
    }, []);

    // Unlock logic:
    // - at 120s (2 minutes), add volunteer #6
    // - at 240s (4 minutes), add volunteer #7
    // In practice: the roster grows over time to increase difficulty/choice.
    useEffect(() => {
        if (!unlocked2m.current && elapsedSec >= 120) {
            unlocked2m.current = true;
            setVolunteers((prev) => (prev.length >= 6 ? prev : [...prev, allVolunteers[5]]));
        }

        if (!unlocked4m.current && elapsedSec >= 240) {
            unlocked4m.current = true;
            setVolunteers((prev) => (prev.length >= 7 ? prev : [...prev, allVolunteers[6]]));
        }
    }, [elapsedSec, allVolunteers]);

    // Handles clicking 👍 on a card. (for testing)
    // In practice: increases experience for that volunteer in state (clamped to 10).
    function handleThumbsUp(id: number) {
        setVolunteers((prev) =>
            prev.map((v) =>
                v.id === id
                    ? { ...v, level_of_experience: Math.min(10, v.level_of_experience + 1) }
                    : v
            )
        );
    }

    // Opens the profile modal for the volunteer.
    function handleOpenProfile(id: number) {
        setProfileId(id);
    }

    // Closes the profile modal.
    function handleCloseProfile() {
        setProfileId(null);
    }

    // Completes an exchange for the volunteer.
    // In practice: increments exchanges count, awards score using scoreForExchange(v).
    function handleCompleteExchange(id: number) {
        setVolunteers((prev) =>
            prev.map((v) => {
                if (v.id !== id) return v;
                //const gained = scoreForExchange(v);
                return {
                    ...v,
                    exchanges_completed: v.exchanges_completed + 1,                    
                };
            })
        );
    }

    function handleAssign(id: number) {
        const volunteer = volunteers.find(v => v.id === id);
        if (!volunteer) return;

        // Remove volunteer from local dashboard state
        setVolunteers(prev => prev.filter(v => v.id !== id));

        onAssignVolunteer(id, volunteer.name);
    }

    // Derived values (computed from state each render).
    // totalScore = player score (sum of all volunteer contributions)
    //const totalScore = volunteers.reduce((sum, v) => sum + v.score, 0);

    // Finds the volunteer for the open modal. If profileId is null, no modal.
    const profileVolunteer = profileId
        ? volunteers.find((v) => v.id === profileId) ?? null
        : null;

    return (
        <div className="min-h-screen bg-[#0b1012] text-gray-100">
            {/* Top HUD area. In practice: displays score, timer, and unlock progress. */}
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                    <div className="text-lg font-semibold">Volunteer Dashboard</div>
                    {/*
                        <div className="text-sm text-gray-300">
                            Total score: {totalScore} • Time: {formatMMSS(elapsedSec)}
                        </div>
                    */}

                    <div className="text-xs text-gray-500">
                        Unlocks: +1 at 02:00, +1 at 04:00 • Active: {volunteers.length}/7
                    </div>
                </div>

                {/* Placeholder for later: pause/reset */}
            </div>

            {/* Bottom strip pinned to screen bottom.
                In practice: this behaves like Dispatch’s horizontal roster bar. */}
            <div className="fixed bottom-0 left-0 right-0 z-[120] border-t border-black/40 bg-[#0f1518]/95 backdrop-blur">
                <div className="overflow-x-auto px-4 py-3">
                    {/* The inner row:
                        - flex: horizontal row of cards
                        - w-max: row width grows with cards
                        - mx-auto: centers the row if it’s narrower than the viewport
                        - still scrolls horizontally when the row is wider than the viewport */}
                    <div className="flex w-max gap-3 mx-auto">
                        {volunteers.map((v) => (
                            <VolunteerCard
                                key={v.id}
                                volunteer={v}
                                onThumbsUp={handleThumbsUp}
                                onOpenProfile={handleOpenProfile}
                                isSelecting={isSelecting}
                                isSelected={selectedVolunteerId === v.id}
                                onSelectVolunteer={onSelectVolunteer}
                                onAssignVolunteer={handleAssign}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Spacer so page content isn't covered by the fixed bottom strip. */}
            <div className="h-[190px]" />

            {/* Conditionally render the modal only when a volunteer is selected. */}
            {profileVolunteer && (
                <ProfileModal
                    volunteer={profileVolunteer}
                    onClose={handleCloseProfile}
                    onThumbsUp={handleThumbsUp}
                    onCompleteExchange={handleCompleteExchange}
                />
            )}
        </div>
    );
}