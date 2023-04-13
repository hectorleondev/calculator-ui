export interface CalculationList {
    total_records: number,
    page: number,
    page_length: number,
    total_pages: number,
    records: Record[]
}

export interface Record {
    record_id: string,
    user_id: string,
    operation_id: string,
    amount: number,
    user_balance: number,
    operation_response: number,
    operation_type: string
}

export interface SaveRecord {
    operation_type: string,
    operation_response: string,
    user_balance: number,
    operation_cost: number
}


