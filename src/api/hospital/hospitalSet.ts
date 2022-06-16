import { request } from "@/utils/http";
import { hospitalType } from "./model/hospitalSetType";
import { hospitalSetType } from "./model/hospitalSetType";
import { reqGetHospitalListTypee, hosSchedType, reqHospitalschedSumType, reqshangxiaxiangType, reqworkDatesz, reqWorkDateType } from "./model/AxiosResponseListType";
import { Key } from "react";
import { reqHospitalSumObj } from "./model/AxiosResponseListType";
import { GetprovinceArr } from "./model/AxiosResponseListType";
import { AxioshospitalType, AxioshospitalSumType, hospitalDetailType, AxiosUpdatehospitalType } from "./model/AxiosResponseType";
import { departmentItemz } from "./model/AxiosResponseType";
export const reqHospital = ({ page, limit, hosname, hoscode }: hospitalType) => {
    return request.get<any, AxioshospitalSumType>(`/admin/hosp/hospitalSet/${page}/${limit}`, {
        params: {
            hosname,
            hoscode
        }
    })
}
//添加医院请求
export const reqHospitalSet = (hospitalSett: hospitalSetType) => {

    return request.post<any, null>(`/admin/hosp/hospitalSet/save`, hospitalSett)
}

//查询ID请求
export const reqHospitalID = (id: number) => {
    return request.get<any, AxiosUpdatehospitalType>(`/admin/hosp/hospitalSet/get/${id}`)
}
//修改数据请求
export const reqHospitalSID = (hospitalValues: AxioshospitalType) => {
    return request.put<any, null>(`/admin/hosp/hospitalSet/update`, hospitalValues)
}

//删除数据请求
export const reqHospitalDeleteID = (id: number) => {
    return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`)
}
//批量删除数据请求
export const reqHospitalDeleteSumID = (data: Key[]) => {
    return request.delete<any, null>(`/admin/hosp/hospitalSet/batchRemove`, {
        data
    })
}
//医院列表数据展示
export const reqHospitalListData = ({ page, limit, ...parms }: reqGetHospitalListTypee) => {
    return request.get<any, reqHospitalSumObj>(`/admin/hosp/hospital/${page}/${limit}`, {
        params: parms
    })
}

//请求省级
export const reqHospitalShengListData = () => {
    return request.get<any, GetprovinceArr>('/admin/cmn/dict/findByDictCode/province')
}

//请求市
export const reqHospitalCityListData = (id: number) => {
    return request.get<any, GetprovinceArr>(`/admin/cmn/dict/findByParentId/${id}`)
}

export const reqHospitalDetail = (id: string) => {
    return request.get<any, hospitalDetailType>(`/admin/hosp/hospital/show/${id}`)
}

export const reqHospitalpaiban = (hoscode: string) => {
    return request.get<any, departmentItemz>(`/admin/hosp/department/${hoscode}`)
}
//请求排班规则数据
export const reqHospitalsched = ({ page, limit, hoscode, depcode }: hosSchedType) => {
    return request.get<any, reqHospitalschedSumType>(`/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`)
}

//定义根据workDate排班日期的排班详细列表
export const reqHospitalsWorkDate = ({ hoscode, depcode, workDate }: reqWorkDateType) => {
    return request.get<any, reqworkDatesz>(`/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`)
}
//定义更新上下线
export const reqHospitalxian = ({ id, status }: reqshangxiaxiangType) => {
    return request.get<any, null>(`/admin/hosp/hospital/updateStatus/${id}/${status}`)
}
