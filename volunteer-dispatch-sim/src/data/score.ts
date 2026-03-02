import type { Volunteer, Course } from "./volunteers";
import type { OpportunityType, Opportunity } from "./opportunities";

// Output
export interface ScoreBreakdown{
    base: number;           // base points of opportunity based on difficulty
    interestBonus: number;  // bonus points if volunteer's interest matches type of opportunity
    languageBonus: number;  // bonus points if volunteer's languages matches requirements of opportunity
    speedBonus: number;     // bonus points if opportunity clicked and assigned within 3-5 seconds
    total: number;          // total points i.e. score
}

// Input
export interface ScoreInput{
    basePoints: number;         // based on difficulty
    interestMatches: boolean;   // volunteer interest(s) matches opportunity type
    languageMatches: boolean    // volunteer language(s) matches opportunity requirements
    timeTakenToAssign: number;  // time it takes to assign a volunteer to an opportunity (in seconds)
}

export const COURSE_BY_OPPORTUNITY_TYPE: Record<OpportunityType, Course[]> = {
    Environment: ["Environmental Science", "Biology", "Geography", "Mechanical Engineering", "Architecture"],
    Education: ["Education", "Mathematics", "Computer Science", "Physics", "Arts", "Design"],
    Health: ["Medicine", "Nursing", "Psychology", "Biology"],
    SocialWork: ["Psychology", "Sociology", "International Relations", "Law", "Politics", "Arts"],
};

export function courseBonus(vol: Volunteer, opp: Opportunity): number {
    const allowed = COURSE_BY_OPPORTUNITY_TYPE[opp.type as OpportunityType] ?? [];
    return allowed.includes(vol.course) ? 25 : 0;
}

export function languageBonus(vol: Volunteer, opp: Opportunity): number {
    const v = new Set(vol.languages ?? []);
    const matched = opp.requirements.language.filter(l => v.has(l)).length;
    return matched * 10;
}

export function calculateAssignmentBonus(vol: Volunteer, opp: Opportunity): number {
    return courseBonus(vol, opp) + languageBonus(vol, opp);
}

// Pass ScoreInput as input and output ScoreBreakdown
export function calculateScore(input: ScoreInput): ScoreBreakdown{

    // Initialise variables
    let interestBonus = 0;
    let languageBonus = 0;
    let speedBonus = 0;
    let total = 0;

    // Interest Bonus
    if(input.interestMatches){
        interestBonus = 30;
    }

    // Language Bonus
    if(input.languageMatches){
        languageBonus = 10;
    }

    // // Time Bonus
    // if(input.timeTakenToAssign <= 10){
    //     speedBonus = 25;
    // }
    // else if(input.timeTakenToAssign <= 20){
    //     speedBonus = 5;
    // }

    // Total
    total = input.basePoints + interestBonus + languageBonus + speedBonus;

    return{
        base: input.basePoints,
        interestBonus,
        languageBonus,
        speedBonus,
        total
    };
}


// EXAMPLE OF HOW SCORING WOULD BE DONE
//
// const handleVolunteerAssign = (volunteer: Volunteer) => {
//     if (!activeOpportunity) return;
//
//     const bonus = calculateAssignmentBonus(volunteer, activeOpportunity);
//
//     setScore(prev => prev + bonus);
// };
