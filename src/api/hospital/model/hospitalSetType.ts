export interface hospitalType {
    page: number,
    limit: number,
    hosname?: string,
    hoscode?: string
}

export interface hospitalSetType {
    "apiUrl": string,
    "contactsName": string,
    "contactsPhone": string,
    "hoscode": string,
    "hosname": string,
    "id"?: number,
}