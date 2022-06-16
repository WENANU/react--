import { Button, Card, Form, Input, Table, Tooltip } from 'antd';
import './index.less'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { reqHospital } from '@/api/hospital/hospitalSet';
import { useEffect, useState, Key } from 'react';
import { AxioshospitalListType, AxioshospitalType } from '@/api/hospital/model/AxiosResponseType';
import { useNavigate } from 'react-router-dom';
import { reqHospitalDeleteID } from '@/api/hospital/hospitalSet';
import { reqHospitalDeleteSumID } from '@/api/hospital/hospitalSet';
const App = () => {
    const [current, setcurrent] = useState(1)
    const [pageSize, setpageSize] = useState(3)
    const [dataList, setDataList] = useState<AxioshospitalListType>([])
    const [listSum, setListSum] = useState(0)
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    const [datelset, setDatel] = useState<Key[]>([])


    interface hospitalSevType {
        username?: string,
        hospitalID?: string
    }


    const [Hosname, setHosname] = useState<hospitalSevType>({})
    async function gethospitalList() {
        setloading(true)
        const { username, hospitalID } = Hosname
        const re = await reqHospital({ page: current, limit: pageSize, hosname: username, hoscode: hospitalID })
        setloading(false)

        setDataList(re.records)
        setListSum(re.total)

    }

    useEffect(() => {
        gethospitalList()
    }, [current, pageSize, Hosname])

    const onFinish = (values: any) => {
        console.log(values, '123');
        setHosname(values)
    };

    const onReset = () => {
        form.resetFields();
    };
   //批量删除获取ID
    const rowSelection = {
        onChange(onSelectChange: Key[]) {
            setDatel(onSelectChange)

        }
    };

    const columns = [
        {
            title: '序号',
            width: 100,
            render: (_: any, __: any, index: number) => {
                return index + 1
            }
        },
        {
            title: "医院名称",
            dataIndex: 'hosname',
        }, {
            title: "医院编号",
            dataIndex: "hoscode",
            width: 100
        },
        {
            title: "api基础路径",
            dataIndex: "apiUrl",
        },
        {
            title: "签名",
            dataIndex: "signKey",
        },
        {
            title: "联系人姓名",
            dataIndex: "contactsName",
        },
        {
            title: "联系人手机",
            // 纯数据渲染直接dataIndex
            dataIndex: "contactsPhone",
        },
        {
            title: "操作",
            // 固定在右侧
            // fixed: 'right', // 报错，会自动将类型推论为string
            fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
            width: 120,
            render: (_: any, c: any) => {
                const { id } = c;

                return <>
                    <Tooltip title="修改">
                        <Button type='primary' onClick={UpdateList(id)} icon={<EditOutlined />}></Button>
                    </Tooltip>
                    <Tooltip title="删除">
                        <Button type='primary' onClick={deleteID(id)} className='minml' danger icon={<DeleteOutlined />}></Button>
                    </Tooltip>

                </>
            }
        },
    ];
    //添加医院
    const navigate = useNavigate()
    function hospitaladd() {
        navigate("/syt/hospital/hospitalSet/add")
    }
    //修改医院
    function UpdateList(id: number) {
        return () => {
            navigate(`/syt/hospital/hospitalUpdateSet/${id}`)
            gethospitalList()
        }
    }
    //删除列表Id
    function deleteID(id: number) {
        return async () => {
            await reqHospitalDeleteID(id)
            gethospitalList()
        }

    }
      //批量删除
      function deletesan() {
        reqHospitalDeleteSumID(datelset)
        gethospitalList()
    }
    return (
        <Card>
            <Form layout='inline' form={form} className='mt ml' name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="医院名称"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="hospitalID"
                    label="医院编号"
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        查询
                    </Button>
                    <Button htmlType="button" onClick={onReset} className='ml' danger>
                        清空
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" onClick={hospitaladd} className="hospitalSet-btn ml mt">
                添加
            </Button>
            <Button type="primary" onClick={deletesan} disabled={datelset.length===0?true:false} danger className='ml mt'>
                批量删除
            </Button>

            <Table
                bordered
                dataSource={dataList}
                columns={columns}
                scroll={{ x: 1300 }}
                rowKey='id'
                loading={loading}
                rowSelection={rowSelection}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: listSum,
                    pageSizeOptions: ['3', '6', '9'],
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange(nowPage, everyNum) {
                        setcurrent(nowPage)
                        setpageSize(everyNum)
                    },
                    showTotal(total) {
                        return `一共${total}条`
                    }
                }}
            />
        </Card>
    );
};

export default App;
