import React, { useEffect, useState } from 'react'
import { Card, Descriptions,Button } from 'antd';
import { useParams } from 'react-router-dom';
import { reqHospitalDetail } from '@/api/hospital/hospitalSet';
import { hospitalDetailType } from '@/api/hospital/model/AxiosResponseType';
import { useNavigate } from 'react-router-dom';
export default function Hosdetail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [hospitalDetail, setdetail] = useState<hospitalDetailType>({
        "bookingRule": {
            "cycle": 10,
            "releaseTime": "",
            "stopTime": "",
            "quitDay": -1,
            "quitTime": "",
            "rule": []
        },
        "hospital": {
            "id": "",
            "createTime": "",
            "updateTime": "",
            "param": {
                "hostypeString": "",
                "fullAddress": ""
            },
            "hoscode": "",
            "hosname": "",
            "hostype": "",
            "provinceCode": "",
            "cityCode": "",
            "districtCode": "",
            "address": "",
            "logoData": "",
            "intro": "",
            "route": "",
            "status": 1,
            "bookingRule": null
        }
    })

    async function reqDetail() {
        const re = await reqHospitalDetail(id as string)
        setdetail(re)
    }
    useEffect(() => {
        reqDetail()
    })
    function fanhui() {
        navigate(-1)
    }
    return (
        <Card>
            <Descriptions title="基本信息" bordered column={2}>
                <Descriptions.Item label="医院名称">{hospitalDetail.hospital.hosname}</Descriptions.Item>
                <Descriptions.Item label="医院logo">{<img width='100px' src={"data:image/jpeg;base64," + hospitalDetail.hospital.logoData} />}</Descriptions.Item>

                <Descriptions.Item label="医院编码"> {hospitalDetail.hospital.hoscode}</Descriptions.Item>
                <Descriptions.Item label="医院地址"> {hospitalDetail.hospital.param.fullAddress}</Descriptions.Item>
                <Descriptions.Item label="坐车路线" span={2}>{hospitalDetail.hospital.route}</Descriptions.Item>
                <Descriptions.Item label="医院简介" span={2}>{hospitalDetail.hospital.intro}</Descriptions.Item>

            </Descriptions>

            <Descriptions title="预约规则信息" bordered column={2} style={{ marginTop: '20px' }}>
                <Descriptions.Item label="预约周期">   {hospitalDetail.bookingRule.cycle}天</Descriptions.Item>
                <Descriptions.Item label="放号时间">{hospitalDetail.bookingRule.releaseTime}</Descriptions.Item>
                <Descriptions.Item label="停挂时间">{hospitalDetail.bookingRule.stopTime}</Descriptions.Item>
                <Descriptions.Item label="退号时间">{hospitalDetail.bookingRule.quitTime}</Descriptions.Item>
                <Descriptions.Item label="预约规则" span={2}>{hospitalDetail.bookingRule.rule.map((rule, index) => {
                    return (
                        <div key={index}>
                            {index + 1}. {rule}
                        </div>
                    );
                })}</Descriptions.Item>
            </Descriptions>
            <Button onClick={fanhui} style={{ marginTop: '20px' }}>返回</Button>
        </Card>
    )
}
