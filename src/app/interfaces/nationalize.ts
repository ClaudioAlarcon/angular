export interface Nationalize {
    name: string;
    country: countryProbability[];
}

export interface countryProbability {
    country_id: string;
    probability: number;
}
