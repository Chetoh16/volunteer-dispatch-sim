export interface Opportunity  {
    id : number,
    name : string,
    location : string,
    description : string,
    sdg : string,
    difficulty: 1 | 2 | 3;  // Only allows 1, 2, or 3
    type: string;
    requirements: {
        age: string;
        language: string;
        other?: string[];
    };
    image: string;

}

export const opportunities: Opportunity[] = [
    {
        id: 1,
        name: "Green Leaders - Environmental Education",
        location: "Bali, Indonesia",
        description: "Educate local communities about climate change through workshops and activities. Help create sustainable practices and environmental awareness programs.",
        sdg: "13 - Climate Action",
        difficulty: 2,  // Medium difficulty
        type: "Environment",
        requirements: {
            age: "18-30",
            language: "English B1 (intermediate)",
            other: ["Passion for environment", "No experience needed - training provided", "Teaching interest"]
        },
        image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Equify - Social Inclusion",
        location: "Rome, Italy",
        description: "Run workshops on human rights and diversity in local schools. Support initiatives that promote equality and fight discrimination.",
        sdg: "10 - Reduced Inequalities",
        difficulty: 2,  // Medium difficulty
        type: "Social Work",
        requirements: {
            age: "18-30",
            language: "English B1 (intermediate), Italian helpful",
            other: ["Interest in social justice", "Cultural sensitivity", "Empathy", "Facilitation interest"]
        },
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Global Classroom",
        location: "Mexico City, Mexico",
        description: "Teach English and basic literacy to children using creative methods. Help improve educational outcomes in underserved communities.",
        sdg: "4 - Quality Education",
        difficulty: 2,  // Medium difficulty
        type: "Education",
        requirements: {
            age: "18-30",
            language: "English C1 (advanced), Spanish helpful",
            other: ["Patient", "Experience with children", "TEFL certification a plus", "Creative teaching"]
        },
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Sustainable Tourism Development",
        location: "Cusco, Peru",
        description: "Help local communities develop eco-tourism initiatives. Support cultural preservation and sustainable economic growth.",
        sdg: "8 - Decent Work & Economic Growth",
        difficulty: 2,  // Medium difficulty
        type: "Social Work",
        requirements: {
            age: "18-30",
            language: "English B1, Spanish basic",
            other: ["Interest in tourism", "Cultural appreciation", "Photography skills a plus", "Research interest"]
        },
        image: "https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Marine Conservation",
        location: "Phuket, Thailand",
        description: "Protect marine ecosystems through education and hands-on activities. Organize beach cleanups and awareness campaigns.",
        sdg: "14 - Life Below Water",
        difficulty: 3,  // Hard difficulty
        type: "Environment",
        requirements: {
            age: "18-30",
            language: "English B1",
            other: ["Love for ocean", "SCUBA certification a plus", "Physically fit", "Swimming ability"]
        },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Youth Empowerment",
        location: "Istanbul, Turkey",
        description: "Facilitate workshops on leadership and global citizenship for local youth. Help young people develop skills for their future.",
        sdg: "4 - Quality Education",
        difficulty: 2,  // Medium difficulty
        type: "Education",
        requirements: {
            age: "18-30",
            language: "English B1+",
            other: ["Experience with youth", "Energetic", "Role model mentality", "Leadership skills"]
        },
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Wildlife Protection",
        location: "San José, Costa Rica",
        description: "Work on conservation projects to protect local wildlife and their habitats. Participate in research and education activities.",
        sdg: "15 - Life on Land",
        difficulty: 3,  // Hard difficulty
        type: "Environment",
        requirements: {
            age: "18-30",
            language: "English B1, Spanish helpful",
            other: ["Outdoor enthusiast", "Physical fitness", "Biology background a plus", "Animal handling interest"]
        },
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Health Awareness",
        location: "Accra, Ghana",
        description: "Run health education campaigns about nutrition, hygiene, and disease prevention. Work with local clinics and schools.",
        sdg: "3 - Good Health & Well-being",
        difficulty: 2,  // Medium difficulty
        type: "Health",
        requirements: {
            age: "18-30",
            language: "English B1",
            other: ["Medical/health background a plus", "Empathetic", "Organized", "Communication skills"]
        },
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Women Empowerment",
        location: "New Delhi, India",
        description: "Support programs that help women gain skills and confidence. Facilitate workshops on entrepreneurship and leadership.",
        sdg: "5 - Gender Equality",
        difficulty: 2,  // Medium difficulty
        type: "Education",
        requirements: {
            age: "18-30",
            language: "English B1+",
            other: ["Experience with women's issues", "Cultural sensitivity", "Inspirational", "Facilitation skills"]
        },
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Clean Water Initiative",
        location: "Nairobi, Kenya",
        description: "Help provide clean water access to communities. Educate about water conservation and sanitation practices.",
        sdg: "6 - Clean Water & Sanitation",
        difficulty: 3,  // Hard difficulty
        type: "Health",
        requirements: {
            age: "18-30",
            language: "English B1",
            other: ["Physically fit", "Engineering background a plus", "Problem solver", "Community work experience"]
        },
        image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Teach Digital Skills",
        location: "Lima, Peru",
        description: "Teach basic computer skills and digital literacy to underserved youth. Help bridge the digital divide and prepare students for modern job markets.",
        sdg: "4 - Quality Education",
        difficulty: 2,  // Medium difficulty
        type: "Education",
        requirements: {
            age: "18-30",
            language: "English B1, Spanish helpful",
            other: ["Knowledge of MS Office/Google Suite", "Troubleshooting skills", "Creative", "Patient teaching style"]
        },
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Refugee Support",
        location: "Athens, Greece",
        description: "Work with refugee communities to provide educational and integration support. Help with language classes, children's activities, and community building.",
        sdg: "10 - Reduced Inequalities",
        difficulty: 3,  // Hard difficulty
        type: "Social Work",
        requirements: {
            age: "18-30",
            language: "English B2, Arabic/Farsi helpful",
            other: ["Empathy", "Cultural sensitivity", "Resilience", "Crisis management skills"]
        },
        image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?w=400&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Urban Gardening",
        location: "Cape Town, South Africa",
        description: "Create and maintain community gardens in urban areas. Teach sustainable farming practices and help communities grow their own food.",
        sdg: "2 - Zero Hunger",
        difficulty: 1,  // Easy difficulty
        type: "Environment",
        requirements: {
            age: "18-30",
            language: "English B1",
            other: ["Love for outdoors", "Sustainable farming knowledge", "Team player", "Physical labor comfortable"]
        },
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Renewable Energy Education",
        location: "Nairobi, Kenya",
        description: "Educate communities about solar energy and other renewable sources. Help install small-scale solar solutions for schools and community centers.",
        sdg: "7 - Affordable & Clean Energy",
        difficulty: 3,  // Hard difficulty
        type: "Education",
        requirements: {
            age: "18-30",
            language: "English B1",
            other: ["Interest in renewable energy", "Problem solving", "Technical mindset", "Basic electrical knowledge"]
        },
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"
    },
    {
        id: 15,
        name: "Elderly Care & Companionship",
        location: "Kyoto, Japan",
        description: "Provide companionship and support to elderly residents. Organize activities, help with daily tasks, and learn about Japanese culture and traditions.",
        sdg: "3 - Good Health & Well-being",
        difficulty: 1,  // Easy difficulty
        type: "Social Work",
        requirements: {
            age: "18-30",
            language: "English B1, Japanese basics helpful",
            other: ["Kind heart", "Interest in Japanese culture", "Reliable", "Patient"]
        },
        image: "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?w=400&h=300&fit=crop"
    }
];