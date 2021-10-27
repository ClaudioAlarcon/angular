export interface Table {
    headers: string[];
    rows: TableData[];
}

export interface TableData{
    flag: string;
    id: string;
    probability: string;
}
