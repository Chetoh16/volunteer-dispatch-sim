// VolunteerCard.tsx

import React from "react";
import type { Volunteer, VolunteerStatus } from "../data/volunteers";
import { COURSE_ACRONYMS, VOLUNTEER_STATUS_LABEL } from "../data/volunteers";

type VolunteerCardProps = {
    volunteer: Volunteer;

    // Thumbs-up bubble: parent updates level_of_experience by +1
    onThumbsUp: (volunteerId: string) => void;

    // Right click to open profile (parent decides modal/route/panel)
    onOpenProfile?: (volunteerId: string) => void;

    // Optional left-click select
    onSelect?: (volunteerId: string) => void;
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
        case "at_uni_work":
            return "bg-amber-100 text-amber-900";
    }
}

export function VolunteerCard({ volunteer, onThumbsUp, onOpenProfile, onSelect }: VolunteerCardProps) {
    const acronym = COURSE_ACRONYMS[volunteer.course] ?? "UNK";
    const statusLabel = VOLUNTEER_STATUS_LABEL[volunteer.status];

    return (
        <div
            className="w-44 select-none overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            onClick={() => onSelect?.(volunteer.id)}
            onContextMenu={(e) => {
                if (!onOpenProfile) return;
                e.preventDefault();
                onOpenProfile(volunteer.id);
            }}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onKeyDown={(e) => {
                if (!onSelect) return;
                if (e.key === "Enter" || e.key === " ") onSelect(volunteer.id);
            }}
        >
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

                <div className="absolute left-2 top-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusClass(volunteer.status)}`}>
                        {statusLabel}
                    </span>
                </div>

                <button
                    type="button"
                    className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 shadow-sm ring-1 ring-black/5"
                    onClick={(e) => {
                        e.stopPropagation();
                        onThumbsUp(volunteer.id);
                    }}
                    aria-label="Increase experience by 1"
                    title="Thumbs up (+1 experience)"
                >
                    <span aria-hidden>👍</span>
                    <span>{volunteer.level_of_experience}</span>
                </button>

                <div className="absolute bottom-2 left-2">
                    <span className="rounded-md bg-black/70 px-2 py-1 text-[11px] font-bold tracking-wide text-white">
                        {acronym}
                    </span>
                </div>
            </div>

            <div className="px-3 py-2">
                <div className="truncate text-sm font-semibold text-gray-900">{volunteer.name}</div>
            </div>
        </div>
    );
}