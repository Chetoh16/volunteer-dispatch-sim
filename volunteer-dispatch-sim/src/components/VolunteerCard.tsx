// VolunteerCard.tsx

import { useMemo, useState } from "react";
import {
    COURSE_ACRONYMS,
    VOLUNTEER_STATUS_LABEL,
    makeVolunteerList,
    type Volunteer,
    type VolunteerStatus,
} from "../data/volunteers";

type VolunteerCardProps = {
    volunteer: Volunteer;

    // Thumbs-up bubble
    onThumbsUp: (volunteerId: number) => void;

    // Right click to open profile
    onOpenProfile?: (volunteerId: number) => void;

    // Selection system
    isSelecting?: boolean;
    isSelected?: boolean;
    onSelectVolunteer?: (volunteerId: number) => void;
    onAssignVolunteer?: (volunteerId: number) => void;

    
};

function statusClass(status: VolunteerStatus) {
    switch (status) {
        case "available":
            return "bg-green-100 text-green-900";
        case "out_volunteering":
            return "bg-blue-100 text-blue-900";
        case "resting":
            return "bg-purple-100 text-purple-900";
        case "unavailable":
            return "bg-gray-200 text-gray-800";
    }
}

export function VolunteerCard({
    volunteer,
    onThumbsUp,
    onOpenProfile,
    isSelecting = false,
    isSelected = false,
    onSelectVolunteer,
    onAssignVolunteer,
}: VolunteerCardProps) {

    const acronym = COURSE_ACRONYMS[volunteer.course] ?? "UNK";
    const statusLabel = VOLUNTEER_STATUS_LABEL[volunteer.status];

    return (
        <div
            className={`
                w-44 select-none overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300
                ${isSelecting ? "ring-4 ring-yellow-400 animate-pulse" : ""}
                ${isSelected ? "ring-4 ring-emerald-500" : ""}
            `}
            onClick={() => {
                if (isSelecting) {
                    onSelectVolunteer?.(volunteer.id);
                }
            }}
            onContextMenu={(e) => {
                if (!onOpenProfile) return;
                e.preventDefault();
                onOpenProfile(volunteer.id);
            }}
            role={isSelecting ? "button" : undefined}
            tabIndex={isSelecting ? 0 : undefined}
            onKeyDown={(e) => {
                if (!isSelecting) return;
                if (e.key === "Enter" || e.key === " ") {
                    onSelectVolunteer?.(volunteer.id);
                }
            }}
        >
            {/* IMAGE SECTION */}
            <div className="relative h-28 w-full bg-gray-100">
                {volunteer.photoUrl ? (
                    <img
                        src={volunteer.photoUrl}
                        alt={`${volunteer.name} photo`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                        No photo
                    </div>
                )}

                {/* STATUS BADGE */}
                <div className="absolute left-2 top-2">
                    <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusClass(
                            volunteer.status
                        )}`}
                    >
                        {statusLabel}
                    </span>
                </div>

                {/* COURSE ACRONYM */}
                <div className="absolute bottom-2 left-2">
                    <span className="rounded-md bg-black/70 px-2 py-1 text-[11px] font-bold tracking-wide text-white">
                        {acronym}
                    </span>
                </div>
            </div>

            {/* NAME */}
            <div className="px-3 py-2">
                <div className="truncate text-sm font-semibold text-gray-900">
                    {volunteer.name}
                </div>
            </div>

            {/* ASSIGN BUTTON (only when selecting AND selected) */}
            {isSelecting && isSelected && (
                <div className="px-3 pb-3">
                    <button
                        className="w-full rounded bg-emerald-600 py-1 text-sm font-semibold text-white hover:bg-emerald-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAssignVolunteer?.(volunteer.id);
                        }}
                    >
                        Assign Volunteer
                    </button>
                </div>
            )}
        </div>
    );
}