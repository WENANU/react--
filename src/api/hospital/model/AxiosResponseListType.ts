export interface reqGetSumListType {
    hoscode?: string
    hosname?: string
    hostype?: string
    provinc?: string
    cityCod?: string
    distric?: string
    status?: 0 | 1
}
export interface reqGetHospitalListTypee extends reqGetSumListType {
    page: number;
    limit: number

}

export interface reqHospitalObj {
    "id": string,
    "createTime": string,
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
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    }
}

export type reqGetshuzu = reqHospitalObj[]

export interface reqHospitalSumObj {
    "content": reqGetshuzu,
    "totalElements": number
}

//请求省的类型
export interface Getprovinceobj {
    "id": number,
    "name": string,
    "value": string,
}

//请求省的List类型
export type GetprovinceArr = Getprovinceobj[]
//医院请求
export interface reqGethospianbanType {
    bookingRule: reqbookingRuleType
    hospital: reqhospitalTypee
}
export interface reqhospitalTypee extends reqhospitalType {
    'bookingRule': null
}
export interface reqhospitalType {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": Number,
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
    "status": 0 | 1
}
export interface reqbookingRuleType {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
}
//请求医院列表的单个医院对象的类型
export interface AxiosHosType extends reqhospitalType {
    "bookingRule": reqbookingRuleType
}

export type AxiosHos = AxiosHosType[]

//排班请求数据类型
export interface hosSchedType {
    page: number,
    limit: number, hoscode: string, depcode: string
}
//请求排班返回值类型
export interface reqHosSched {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": number,
    "availableNumber": number,
}
export interface reqHospitalschedType extends reqHosSchedsz {
    "total": number
    'bookingScheduleList': reqHosSchedsz
    "baseMap": {
        "hosname": string
    }
}
export type reqHosSchedsz = reqHosSched[]

export type reqHospitalschedSumType = reqHospitalschedType

//定义根据日期获取排班列表
export interface reqWorkDateType {
    hoscode: string, depcode: string, workDate: string
}
//定义根据日期获取排班返回值
export interface reqworkDate {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill": string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount": number,
    "status": number,
    "hosScheduleId": string

}
export type reqworkDatesz = reqworkDate[]

//上下线类型
export interface reqshangxiaxiangType {
    id: string,
    status: 0 | 1
}