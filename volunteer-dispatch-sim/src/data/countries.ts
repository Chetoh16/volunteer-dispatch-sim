/*
    Indicates whether the country has no opportunities ("idle"),
                                  has an opportunity available ("alert"),
                                  has an opportunity currently being taken ("active").
*/
export type CountryStatus = "idle" | "alert" | "active";

// Define structure for a country 
export interface CountryState{
    name: string;
    iso: string;
    status: CountryStatus;
}
