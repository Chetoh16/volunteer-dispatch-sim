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
    headline?: string;

    status: VolunteerStatus;
    remoteOk?: boolean;

    level_of_experience: number; // 0..10

    course: Course;
    languages?: string[];
    tags?: string[];

    // Scoring
    exchanges_completed: number;
    score: number;

    photoUrl?: string;

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

export const COURSE_INTERESTS: Record<Course, string[]> = {
    "Computer Science": ["Software volunteering", "Web development", "Data support", "Tech mentoring"],
    "Arts": ["Community outreach", "Creative workshops", "Youth engagement", "Fundraising design"],
    "Business Management": ["Event coordination", "Partnerships", "Operations support", "Team leadership"],
    "Mechanical Engineering": ["Sustainability", "Prototyping help", "STEM outreach", "Logistics support"],
    "Medicine": ["Public health volunteering", "Health education", "Community care support", "Wellbeing outreach"],
    "Psychology": ["Mental health advocacy", "Peer support", "Wellbeing workshops", "Listening support"],
    "Law": ["Human rights awareness", "Legal clinic support", "Policy research", "Civic education"],
    "International Relations": ["Cultural exchange", "NGO support", "Community liaison", "Project coordination"],
    "Education": ["Literacy support", "Tutoring", "Youth coaching", "Classroom support"],
    "Environmental Science": ["Climate action", "Recycling campaigns", "Community clean-ups", "Sustainability outreach"],
    "Economics": ["Social impact research", "Data collection", "Grant support", "Community surveys"],
    "Nursing": ["Community care", "Patient support", "Health outreach", "Wellbeing assistance"],
    "Marketing": ["Campaign coordination", "Social media", "Content planning", "Outreach promotion"],
    "Architecture": ["Urban regeneration", "Community planning", "Design support", "Accessibility projects"],
    "Biology": ["Conservation projects", "Biodiversity surveys", "Education outreach", "Lab support"],
    "History": ["Heritage preservation", "Museum support", "Archive organisation", "Guided tours support"],
    "Sociology": ["Inclusion initiatives", "Community research", "Youth programmes", "Social outreach"],
    "Mathematics": ["STEM tutoring", "Data support", "Workshop facilitation", "Problem-solving mentoring"],
    "Physics": ["Science outreach", "STEM demos", "Tech support", "Workshop assistance"],
    "Politics": ["Civic engagement", "Community organising", "Policy outreach", "Campaign volunteering"],
    "Media Studies": ["Digital storytelling", "Video editing", "Content creation", "Campaign media"],
    "Philosophy": ["Ethics workshops", "Debate facilitation", "Mentoring", "Community dialogue"],
    "Sports Science": ["Youth coaching", "Sports sessions", "Wellbeing activities", "Team facilitation"],
    "Geography": ["Development studies", "Mapping support", "Fieldwork help", "Community projects"],
    "Design": ["Creative workshops", "UI support", "Poster design", "Campaign materials"],
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

function makeHeadline(course: Course, rnd: () => number): string {
    const interest = pickOne(COURSE_INTERESTS[course], rnd);
    return `${course} student • ${interest}`;
}

export function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Scoring rule (single source of truth)
export function scoreForExchange(v: Volunteer): number {
    return 10 + v.level_of_experience;
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
    exchanges_completed: 0,
    score: 0,
    photoUrl: "",
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
    const headline = makeHeadline(course, rnd);

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
        exchanges_completed: 0,
        score: 0,
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