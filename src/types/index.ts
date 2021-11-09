export interface IUser {
    effective_date: string;
    id: number;
    name: string;
    primary_insured_id: number;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip_code: string;
    terminated_at: string;
}

export interface IBrushingRecord {
    id: string;
    date: Date;
    duration: {
        minutes: string;
        seconds: string;
    };
}