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

    // Time Bonus
    if(input.timeTakenToAssign <= 10){
        speedBonus = 25;
    }
    else if(input.timeTakenToAssign <= 20){
        speedBonus = 5;
    }

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
