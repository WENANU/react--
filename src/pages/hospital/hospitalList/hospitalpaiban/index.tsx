import { Card, Row, Col, Tree, Tag, Pagination, Table } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { reqHospitalsched, reqHospitalsWorkDate } from '@/api/hospital/hospitalSet';
import './index.less'
import { useParams } from 'react-router-dom';
import { reqHospitalpaiban } from '@/api/hospital/hospitalSet';
import { departmentItemz } from '@/api/hospital/model/AxiosResponseType';
import { reqHosSchedsz, reqworkDatesz } from '@/api/hospital/model/AxiosResponseListType';
export default function Hospitalbaiban() {
    const { hoscode } = useParams()
    //terr默认展开
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    //terr默认选中
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [current, setcurrent] = useState(1)
    const [pageSize, setpageSize] = useState(3)
    //数据总条数
    const [total, settotal] = useState(0)
    //数据来源
    const [pb, setpb] = useState<departmentItemz>([])
    //技能列表
    const [datalist, setdatalist] = useState<reqworkDatesz>([])


    const [schched, setSched] = useState<reqHosSchedsz>([])

    const [hospitalName, sethospitalName] = useState('')
    const [depname, setdepname] = useState('')
    const [workDate, setworkDate] = useState('')


    //组件初始挂载请求科室
    async function reqhospb() {
        const re = await reqHospitalpaiban(hoscode as string)
        //初始展开科室
        setExpandedKeys([re[0].depcode])
        //总数
        setpb(re.map((item) => ({ ...item, disabled: true })))
        setdepname(re[0]?.children[0]?.depname)

        return re
    }


    async function reqHosScheule() {
        const route = await reqhospb()
        console.log(route, 'rrrrrrrrr0');

        const depcode = route[0]?.children[0]?.depcode
        //请求排班规则数据
        const re = await reqHospitalsched({ page: current, limit: pageSize, hoscode: hoscode as string, depcode: depcode })
        setSched(re.bookingScheduleList)
        settotal(re.total)

        sethospitalName(re.baseMap.hosname)
        setworkDate(re.bookingScheduleList[0].workDate)

        setSelectedKeys([depcode])
        return {
            re: re,
            depcode: depcode
        }
    }

    async function reqhosWorkDate() {
        const { re, depcode } = await reqHosScheule()
        const workDate = re.bookingScheduleList[0].workDate
        const workDateRoute = await reqHospitalsWorkDate({ hoscode: hoscode as string, depcode, workDate })
        setdatalist(workDateRoute)

    }

    useEffect(() => {
        reqhosWorkDate()
    }, [])

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
    };

    const onSelect = async (depcode: React.Key[], info: any) => {
        if (depcode.length === 0) return
        setSelectedKeys(depcode);
        //请求排班规则数据
        const re = await reqHospitalsched({ page: current, limit: pageSize, hoscode: hoscode as string, depcode: depcode[0].toString() })
        setSched(re.bookingScheduleList)
        settotal(re.total)

        sethospitalName(re.baseMap.hosname)
        setworkDate(re.bookingScheduleList[0]?.workDate)
        setdepname(info.node.depname)

        try {
            const workDate = re.bookingScheduleList[0]?.workDate
            const workDateRoute = await reqHospitalsWorkDate({ hoscode: hoscode as string, depcode: depcode[0].toString(), workDate })
            setdatalist(workDateRoute)
        } catch (e) {
            setdatalist([])
        }
    };

    //分页请求
    async function pageChange(current: number, pageSize: number) {
        const depcode = pb[0]?.children[0]?.depcode
        const re = await reqHospitalsched({ page: current, limit: pageSize, hoscode: hoscode as string, depcode: depcode })
        setSched(re.bookingScheduleList)
        settotal(re.total)

        setcurrent(current)
        setpageSize(pageSize)
    }
    //设置高亮
    function gl(workDate: string) {
        return async () => {
            setworkDate(workDate)
            const workDateRoute = await reqHospitalsWorkDate({ hoscode: hoscode as string, depcode: selectedKeys[0].toString(), workDate })
            setdatalist(workDateRoute)
        }
    }
    const columns = [
        {
            title: '序号',
            width: 100,
            render: (_: any, __: any, index: number) => {
                return index + 1
            }
        },
        {
            title: "职称",
            dataIndex: 'title',
        },
        {
            title: "号源时间",
            dataIndex: 'workDate',
        }, {
            title: "可预约数",
            dataIndex: "reservedNumber",
        },
        {
            title: "剩余预约数",
            dataIndex: "availableNumber",
        },
        {
            title: "挂号费(元)",
            dataIndex: "amount",
        },
        {
            title: "擅长技能",
            dataIndex: "skill",
        }
    ];
    return (
        <Card>
            <p >选择:/{hospitalName}/{depname}/{workDate}</p>
            <Row>
                <Col span={5} >
                    <div style={{ border: '1px solid #999' }}>
                        <Tree
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={pb as []}
                            fieldNames={{
                                key: 'depcode',
                                title: 'depname'
                            }}
                        />
                    </div>
                </Col>
                <Col span={18} offset={1} >
                    {
                        schched.map((item) => {
                            return <Tag className={workDate === item.workDate ? 'active' : ''} key={item.workDate} onClick={gl(item.workDate)}>

                                <p>{item.workDate}{item.dayOfWeek}</p>
                                <p>{item.availableNumber}/{item.reservedNumber}</p>
                            </Tag>
                        })
                    }
                    <Pagination
                        style={{ marginTop: '20px' }}
                        current={current}
                        pageSize={pageSize}
                        onChange={pageChange}
                        total={total}
                    />
                    <Table
                        style={{ marginTop: '20px' }}
                        bordered
                        rowKey='id'
                        dataSource={datalist}
                        columns={columns}
                        scroll={{ x: 1300 }}
                        pagination={false}
                    />
                </Col>

            </Row>
        </Card >
    )
}
