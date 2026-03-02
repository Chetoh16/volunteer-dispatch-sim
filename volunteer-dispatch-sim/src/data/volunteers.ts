export type VolunteerStatus =
    | "available"
    | "out_volunteering"
    | "resting"
    | "unavailable"

export const VOLUNTEER_STATUS_LABEL: Record<VolunteerStatus, string> = {
    available: "Available",
    out_volunteering: "Out volunteering",
    resting: "Resting",
    unavailable: "Unavailable",
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


// Immediately Invoked Function Expression (IIFE)
// Runs once when the file is loaded
// Ensures that no two courses share the same acronym.
(function validateUniqueAcronyms() {
    const values = Object.values(COURSE_ACRONYMS);
    const unique = new Set(values);
    if (values.length !== unique.size) {
        throw new Error("Duplicate course acronyms detected in COURSE_ACRONYMS.");
    }
})();

export type Volunteer = {
    id: number;
    name: string;
    age: number; // 18..30
    headline?: string;

    // All volunteers start as "available"
    status: VolunteerStatus;

    level_of_experience: number; // 0..10

    exchanges_completed: number;

    course: Course;
    languages?: string[];
    tags?: string[];

    photoUrl?: string;
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
    languages: ["English", "Spanish", "French", "German", "Italian", "Arabic", "Farsi", "Japanese"],
    tags: [
        "Driving Licence",
        "First Aid",
        "DBS Check",
        "Teaching Assistant",
        "Event Stewarding",
        "Fundraising",
    ],
};

export const CURRENT_TITLES: Record<Course, string[]> = {
    "Computer Science": [
        "Lamba's Company Intern",
        "Freelance Web Developer",
        "Coding Tutor",
        "Junior IT Support",
    ],

    "Arts": [
        "Gallery Assistant",
        "Freelance Illustrator",
        "Community Arts Facilitator",
        "Creative Workshop Assistant",
    ],

    "Business Management": [
        "Startup Intern",
        "Retail Supervisor",
        "Operations Assistant",
        "Business Analyst Intern",
    ],

    "Mechanical Engineering": [
        "Workshop Technician",
        "CAD Intern",
        "STEM Outreach Assistant",
        "Manufacturing Intern",
    ],

    "Medicine": [
        "Hospital Volunteer",
        "Medical Receptionist",
        "Care Assistant",
        "Clinical Placement Student",
    ],

    "Psychology": [
        "Mental Health Support Volunteer",
        "Behavioural Research Assistant",
        "Peer Support Mentor",
        "Care Worker",
    ],

    "Law": [
        "Legal Intern",
        "Paralegal Assistant",
        "Legal Clinic Volunteer",
        "Compliance Assistant",
    ],

    "International Relations": [
        "NGO Intern",
        "Community Liaison Volunteer",
        "Policy Research Assistant",
        "Cultural Exchange Coordinator",
    ],

    "Education": [
        "GCSE Maths Tutor",
        "Teaching Assistant",
        "After-school Tutor",
        "Classroom Support Assistant",
    ],

    "Environmental Science": [
        "Sustainability Intern",
        "Recycling Programme Volunteer",
        "Environmental Survey Assistant",
        "Conservation Volunteer",
    ],

    "Economics": [
        "Data Analyst Intern",
        "Research Assistant",
        "Finance Intern",
        "Market Research Assistant",
    ],

    "Nursing": [
        "Healthcare Assistant",
        "Care Home Worker",
        "Community Health Volunteer",
        "Patient Support Worker",
    ],

    "Marketing": [
        "Social Media Manager",
        "Marketing Intern",
        "Content Creator",
        "Y's & Z's Brand Ambassador",
    ],

    "Architecture": [
        "Architectural Assistant",
        "CAD Enthusiast",
        "Design Studio Intern",
        "Urban Planning Intern",
    ],

    "Biology": [
        "Lab Assistant",
        "Research Intern",
        "Wildlife Conservation Volunteer",
        "Science Outreach Assistant",
    ],

    "History": [
        "Museum Guide",
        "Archive Assistant",
        "Heritage Site Volunteer",
        "Research Assistant",
    ],

    "Sociology": [
        "Community Outreach Worker",
        "Social Research Assistant",
        "Youth Programme Volunteer",
        "Community Project Intern",
    ],

    "Mathematics": [
        "GCSE Maths Tutor",
        "Statistics Assistant",
        "Data Analyst Intern",
        "STEM Tutor",
    ],

    "Physics": [
        "Laboratory Assistant",
        "Science Demonstrator",
        "Research Intern",
        "GCSE Physics Tutor",
    ],

    "Politics": [
        "Policy Intern",
        "Campaign Assistant",
        "Civic Engagement Volunteer",
        "Research Assistant",
    ],

    "Media Studies": [
        "Freelance Video Editor",
        "Content Creator",
        "Podcast Producer",
        "Social Media Editor",
    ],

    "Philosophy": [
        "Debate Club Facilitator",
        "Ethics Research Assistant",
        "Academic Tutor",
        "Editorial Assistant",
    ],

    "Sports Science": [
        "Fitness Coach",
        "Sports Club Trainer",
        "Youth Sports Instructor",
        "Gym Assistant",
    ],

    "Geography": [
        "Field Survey Assistant",
        "GIS Intern",
        "Mapping Assistant",
        "Environmental Fieldworker",
    ],

    "Design": [
        "Freelance Graphic Designer",
        "UI Design Intern",
        "Poster Designer",
        "Creative Studio Assistant",
    ],
};

/*
    Returns one random element from an array
    Used for:
        - Picking random first names
        - Picking random courses
        - Picking interest
*/
function pickOne<T>(arr: readonly T[], rnd: () => number): T {
    return arr[Math.floor(rnd() * arr.length)];
}


// Returns multiple UNIQUE random elements from an array.
// It never picks the same item twice by copying the array and removing items as they are selected.
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

// Restricts a number to stay within a minimum and maximum range
// e.g. clamp(15, 0, 10) -> 10, clamp(-2, 0, 10) -> 0
function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}


// Generates a dynamic headline for a volunteer based on their course and a random Title
// e.g. "Computer Science student - Tech mentoring"
function makeHeadline(course: Course, rnd: () => number): string {
    const title = pickOne(CURRENT_TITLES[course], rnd);
    return `${title} • ${course} student`;
}


// A seeded pseudo-random number generator?
// Math.random() changes every run but mulberry32(seed) produces predictable randomness.
export function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}


export const FIXED_VOLUNTEER: Volunteer = {
    id: 2350831597978,
    name: "Dylan",
    age: 27,
    headline: "Masters in Computer Science • C",
    status: "available",
    level_of_experience: 1,
    course: "Computer Science",
    languages: ["English"],
    tags: [],
    photoUrl: "",
    exchanges_completed: 0,
};

/*

Generates one random volunteer

- index: used to help generate a unique ID
- rnd: random function (can be seeded)
- reservedNames: prevents duplicate names (e.g., fixed volunteer)

- Generates a unique name
- Sets status to "available"
- Randomises age (18–30)
- Randomises experience (0–10)
- Picks a random course
- Generates headline
- Assigns random languages
- Assigns random tags
*/
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

    // All volunteers start available!!!
    const status: VolunteerStatus = "available";

    // Age Random + Level
    const age = Math.floor(rnd() * (30 - 18 + 1)) + 18;
    const level_of_experience = clamp(Math.round(rnd() * 10), 0, 10);


    const course = pickOne(VOLUNTEER_POOL.courses, rnd);
    const headline = makeHeadline(course, rnd);

    const baseLanguages = VOLUNTEER_POOL.languages;

    // LANGUAGE RANDOMISER!!!
// 70%: includes English + 0..2 more
// 30%: does NOT include English, starts with a non-English language + 0..2 more
    const includeEnglish = rnd() < 0.7;

    let languages: string[];

    if (includeEnglish) {
        const extras = pickManyUnique(
            baseLanguages.filter(l => l !== "English"),
            Math.floor(rnd() * 3), // 0..2 extra
            rnd
        );
        languages = ["English", ...extras];
    } else {
        const count = 1 + Math.floor(rnd() * 3); // 1..3 languages, none are English guaranteed
        languages = pickManyUnique(
            baseLanguages.filter(l => l !== "English"),
            count,
            rnd
        );
    }

    const tags = pickManyUnique(
        VOLUNTEER_POOL.tags,
        Math.floor(rnd() * 4),
        rnd
    );

    return {
        id: Number(`${index}${Math.floor(rnd() * 1e12)}`),
        name,
        age,
        headline,
        status,
        level_of_experience,
        course,
        languages,
        tags,
        photoUrl: "",
        exchanges_completed: 0,
    };
}

/*
Generates a full list of volunteers.

- count: total number of volunteers
- seed (optional): makes the list deterministic

- Always includes FIXED_VOLUNTEER as the first element.
- Then generates (count - 1) random volunteers.
*/

export function makeVolunteerList(count: number, seed?: number): Volunteer[] {
    const rnd = typeof seed === "number" ? mulberry32(seed) : Math.random;

    const randomVolunteers = Array.from(
        { length: Math.max(0, count - 1) },
        (_, i) => makeRandomVolunteer(i + 1, rnd)
    );

    return [FIXED_VOLUNTEER, ...randomVolunteers];
}