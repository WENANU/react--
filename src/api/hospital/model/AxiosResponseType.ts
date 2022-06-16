export interface AxioshospitalType {
    "id"?: number,
    "hosname"?: string,
    "hoscode"?: string,
    "apiUrl"?: string,
    "signKey"?: string,
    "contactsName"?: string,
    "contactsPhone"?: string,
}

export type AxioshospitalListType = AxioshospitalType[]
export interface AxioshospitalSumType {
    "total": number,
    "records": AxioshospitalType[]
}
export interface AxiosUpdatehospitalType {
    id?: number,
    apiUrl: string,
    contactsName: string,
    contactsPhone: string,
    hoscode: string,
    hosname: string,
}
//医院详情
export interface hospitalDetailType {
    bookingRule: bookingRuleType;
    hospital: hospitalDetailJCType
}

export interface hospitalDetailJCType extends AxiosHosjcType {
    "bookingRule": null
}


export interface bookingRuleType {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
}

export interface AxiosHosjcType {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "param": {
        "hostypeString": string,
        "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": 0 | 1,
}

//科室请求返回值item
export interface departmentItem {
    "depcode": string,
    "depname": string,
    "children": departmentItemz
}

export type departmentItemz = departmentItem[]

