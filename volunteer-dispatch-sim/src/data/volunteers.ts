// volunteers.ts

export type VolunteerStatus =
    | "available"
    | "out_volunteering"
    | "resting"
    | "unavailable"
    | "at_uni_work";

export const VOLUNTEER_STATUS_LABEL: Record<VolunteerStatus, string> = {
    available: "Available",
    out_volunteering: "Out volunteering",
    resting: "Resting",
    unavailable: "Unavailable",
    at_uni_work: "At uni/work",
};

export const COURSE_ACRONYMS = {
    "Computer Science": "CS",
    "Arts": "ART",
    "Business Management": "BUS",
    "Mechanical Engineering": "ME",
    "Medicine": "MED",
    "Psychology": "PSY",
    "Law": "LAW",
    "International Relations": "IR",
    "Education": "EDU",
    "Environmental Science": "ENV",
    "Economics": "ECO",
    "Nursing": "NUR",
    "Marketing": "MKT",
    "Architecture": "ARC",
    "Biology": "BIO",
    "History": "HIS",
    "Sociology": "SOC",
    "Mathematics": "MAT",
    "Physics": "PHY",
    "Politics": "POL",
    "Media Studies": "MDS",
    "Philosophy": "PHI",
    "Sports Science": "SPS",
    "Geography": "GEO",
    "Design": "DES",
} as const;

export type Course = keyof typeof COURSE_ACRONYMS;

(function validateUniqueAcronyms() {
    const values = Object.values(COURSE_ACRONYMS);
    const unique = new Set(values);
    if (values.length !== unique.size) {
        throw new Error("Duplicate course acronyms detected in COURSE_ACRONYMS.");
    }
})();

export type Volunteer = {
    id: string;
    name: string;
    age: number; // 18..30
    headline?: string; // Course + interest/role

    status: VolunteerStatus;
    remoteOk?: boolean;

    level_of_experience: number; // 0..10

    course: Course;
    languages?: string[];
    tags?: string[];

    photoUrl?: string; // png path/url for card photo

    fit?: {
        score: number; // 0..100
        matched: string[];
        missing: string[];
    };
};

// Option pools
export const VOLUNTEER_POOL = {
    firstNames: [
        "Oliver", "Harry", "George", "Jack", "Thomas",
        "Henry", "James", "Daniel", "William", "Leo",
        "Amelia", "Emily", "Sophia", "Isabella", "Charlotte",
        "Grace", "Lily", "Ava", "Ella", "Freya",

        // Chinese (3)
        "Wei", "Li", "Chen",

        // Japanese (3)
        "Haruto", "Yuki", "Sora",

        // Balkan (9)
        "Luka", "Nikola", "Milan",
        "Stefan", "Andrei", "Petar",
        "Elena", "Ana", "Mateo",

        // American (5)
        "Jacob", "Emily", "Michael",
        "Olivia", "Daniel",

        // Middle Eastern (10)
        "Omar", "Layla", "Youssef",
        "Fatima", "Hassan", "Noor",
        "Ali", "Zain", "Mariam",
        "Karim",

        // Indian (4)
        "Arjun", "Priya", "Rohan", "Ananya",
    ],
    lastNames: [
        "Smith", "Johnson", "Brown", "Taylor", "Wilson",
        "Thompson", "White", "Harris", "Martin", "Clark",
        "Lewis", "Walker", "Hall", "Young", "Allen",
        "King", "Wright", "Scott", "Green", "Baker",

        // Chinese
        "Wang", "Zhang", "Liu",

        // Japanese
        "Tanaka", "Sato", "Suzuki",

        // Balkan
        "Popovic", "Ionescu", "Petrovic",
        "Stojanov", "Markovic", "Dimitrov",
        "Georgiev", "Kovacevic", "Jovanovic",

        // American (note: duplicates with early entries are OK)
        "Williams", "Miller",

        // Middle Eastern
        "Haddad", "Khan", "Rahman",
        "Abdullah", "Hussein", "Farah",
        "Nasser", "Malik", "Salim",
        "Khalil",

        // Indian
        "Patel", "Sharma", "Singh", "Reddy",
    ],
    headlines: [
        "CS student • Youth leadership",
        "Arts student • Community outreach",
        "Business student • Event coordination",
        "Engineering student • Sustainability",
        "Medical student • Public health volunteering",

        "Psychology student • Mental health advocacy",
        "Law student • Human rights awareness",
        "International Relations student • Cultural exchange",
        "Education student • Literacy support",
        "Environmental Science student • Climate action",

        "Economics student • Social impact research",
        "Nursing student • Community care",
        "Marketing student • Campaign coordination",
        "Architecture student • Urban regeneration",
        "Biology student • Conservation projects",

        "History student • Heritage preservation",
        "Sociology student • Inclusion initiatives",
        "Mathematics student • STEM tutoring",
        "Physics student • Science outreach",
        "Politics student • Civic engagement",

        "Media student • Digital storytelling",
        "Philosophy student • Ethics workshops",
        "Sports Science student • Youth coaching",
        "Geography student • Development studies",
        "Design student • Creative workshops",
    ],
    courses: Object.keys(COURSE_ACRONYMS) as Course[],
    languages: ["English", "Spanish", "French", "German", "Italian"],
    tags: [
        "Driving Licence",
        "First Aid",
        "DBS Check",
        "Teaching Assistant",
        "Event Stewarding",
        "Fundraising",
    ],
    statuses: [
        "available",
        "out_volunteering",
        "resting",
        "unavailable",
        "at_uni_work",
    ] as const,
};

function pickOne<T>(arr: readonly T[], rnd: () => number): T {
    return arr[Math.floor(rnd() * arr.length)];
}

function pickManyUnique<T>(arr: readonly T[], count: number, rnd: () => number): T[] {
    const copy = [...arr];
    const out: T[] = [];
    const c = Math.min(count, copy.length);

    for (let i = 0; i < c; i++) {
        const idx = Math.floor(rnd() * copy.length);
        out.push(copy[idx]);
        copy.splice(idx, 1);
    }

    return out;
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export const FIXED_VOLUNTEER: Volunteer = {
    id: "v_fixed_001",
    name: "Dylan",
    age: 27,
    headline: "MASTERS Computer Science • Questionable Ethics Expert",
    status: "available",
    remoteOk: true,
    level_of_experience: 1,
    course: "Computer Science",
    languages: ["English"],
    tags: [],
    photoUrl: "", // set to a png path when you have it
};

export function makeRandomVolunteer(
    index: number,
    rnd: () => number = Math.random,
    reservedNames: Set<string> = new Set([FIXED_VOLUNTEER.name])
): Volunteer {
    let name = "";
    let attempts = 0;

    do {
        const first = pickOne(VOLUNTEER_POOL.firstNames, rnd);
        const last = pickOne(VOLUNTEER_POOL.lastNames, rnd);
        name = `${first} ${last}`;
        attempts++;
    } while (reservedNames.has(name) && attempts < 20);

    const status = pickOne(VOLUNTEER_POOL.statuses, rnd);

    const age = Math.floor(rnd() * (30 - 18 + 1)) + 18;
    const level_of_experience = clamp(Math.round(rnd() * 10), 0, 10);

    const course = pickOne(VOLUNTEER_POOL.courses, rnd);
    const headline = pickOne(VOLUNTEER_POOL.headlines, rnd);

    const remoteOk = rnd() > 0.35;

    const languages = pickManyUnique(
        VOLUNTEER_POOL.languages,
        1 + Math.floor(rnd() * 3),
        rnd
    );

    const tags = pickManyUnique(
        VOLUNTEER_POOL.tags,
        Math.floor(rnd() * 4),
        rnd
    );

    return {
        id: `v_${index}_${Math.floor(rnd() * 1e9)}`,
        name,
        age,
        headline,
        status,
        remoteOk,
        level_of_experience,
        course,
        languages,
        tags,
        photoUrl: "",
    };
}

export function makeVolunteerList(count: number, seed?: number): Volunteer[] {
    const rnd = typeof seed === "number" ? mulberry32(seed) : Math.random;

    const randomVolunteers = Array.from(
        { length: Math.max(0, count - 1) },
        (_, i) => makeRandomVolunteer(i + 1, rnd)
    );

    return [FIXED_VOLUNTEER, ...randomVolunteers];
}