import { Button, Card, Form, Input, Table, Tooltip, Select } from 'antd';
import './index.less'
import { useEffect, useState, Key } from 'react';
import { reqHospitalListData } from '@/api/hospital/hospitalSet';
import { reqGetshuzu, reqshangxiaxiangType } from '@/api/hospital/model/AxiosResponseListType';
import { reqHospitalShengListData } from '@/api/hospital/hospitalSet';
import { GetprovinceArr } from '@/api/hospital/model/AxiosResponseListType';
import { reqHospitalCityListData } from '@/api/hospital/hospitalSet';
import { reqGetSumListType } from '@/api/hospital/model/AxiosResponseListType';
import { useNavigate } from 'react-router-dom';
import { reqHospitalxian } from '@/api/hospital/hospitalSet';
import './index.less'
const App = () => {
  const navigate = useNavigate()
  const [current, setcurrent] = useState(1)
  const [pageSize, setpageSize] = useState(3)
  const [dataList, setDataList] = useState<reqGetshuzu>([])
  const [listSum, setListSum] = useState(0)
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false)
  const [province, setprovinec] = useState<GetprovinceArr>([])
  const [city, setcity] = useState<GetprovinceArr>([])
  const [xian, setxian] = useState<GetprovinceArr>([])
  const [reqType, setreqType] = useState<GetprovinceArr>([])
  const [SumShuju, setSumShuJu] = useState<reqGetSumListType>({})
  async function gethospitalList() {
    setloading(true)
    const re = await reqHospitalListData({ page: current, limit: pageSize, ...SumShuju })
    setloading(false)
    setDataList(re.content)
    setListSum(re.totalElements)

  }

  useEffect(() => {
    gethospitalList()
  }, [current, pageSize, SumShuju])

  useEffect(() => {
    async function reqgetHosprovince() {
      const re = await reqHospitalShengListData()
      console.log(re, 'reeeee1');
      setprovinec(re)
    }
    reqgetHosprovince()
  }, [])
  //组件刚挂载 加载类型
  useEffect(() => {
    async function reqgetHosgetType() {
      async function reqcity() {
        const re = await reqHospitalCityListData(10000)
        setreqType(re)
      }
      reqcity()
    }
    reqgetHosgetType()
  }, [])
  //查询
  const onFinish = (values: reqGetSumListType) => {
    setSumShuJu(values)
  };
  //清空
  const onReset = () => {
    form.resetFields();
    setSumShuJu({})
  };

  //请求省
  function onGenderChange(value: number) {
    async function reqcity() {
      const re = await reqHospitalCityListData(value)
      setcity(re)
    }
    reqcity()
  }
  //请求市
  function onCityChange(value: number) {
    async function reqcity() {
      const re = await reqHospitalCityListData(value)
      setxian(re)
    }
    reqcity()
  }
  //查看医院详情
  function hoschakan(id: string) {
    return () => {
      navigate(`/syt/hospital/hospitalUpdateSet/hosdetail/${id}`)
    }

  }

  function paiban(hoscode: string) {
    return () => {
      navigate(`/syt/hospital/hospitalUpdateSet/hosdetailpaiban/${hoscode}`)
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
      title: "医院loge",
      dataIndex: 'logoData',
      width: 150,
      render(logoData: string) {
        return <img src={"data:image/jpeg;base64," + logoData} style={{ width: '100px' }} />
      }
    },
    {
      title: "医院名称",
      dataIndex: 'hosname',
    }, {
      title: "等级",
      dataIndex: "param",
      render(param: any) {
        return param.hostypeString
      }
    },
    {
      title: "详细地址",
      dataIndex: "param",
      render(param: any) {
        return param.fullAddress
      }
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 260,
      render: (_: any, c: any) => {
        const { id } = c;

        return <>
          <Button type='primary' className='minml' onClick={hoschakan(id)}>查看</Button>
          <Button type='primary' className='minml' onClick={paiban(c.hoscode)}>排班</Button>
          {
            c.status === 0
              ? <Button type='primary' className='minml' onClick={xx(c)} >上线</Button>
              : <Button type='primary' className='minml' onClick={xx(c)}>下线</Button>
          }
        </>
      }
    },
  ];
  function xx({ id, status }: reqshangxiaxiangType) {
    return async () => {
      const nowStatus = status === 0 ? 1 : 0
      await reqHospitalxian({id, status: nowStatus})
      gethospitalList()
    }
  }
  const { Option } = Select
  return (
    <Card>
      <Form layout='inline' form={form} className='mt ml' name="control-hooks" onFinish={onFinish}>
        <Form.Item name="provinceCode"
          className='width250'
          style={{ marginBottom: '20px' }}>
          <Select
            placeholder="请选择省"
            onChange={onGenderChange}
          >
            {
              province.map((item) => {
                return <Option key={item.id} value={item.value}>{item.name}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="cityCode" className='width250'
          style={{ marginBottom: '20px' }}>
          <Select
            placeholder="请选择市"
            onChange={onCityChange}
          >
            {
              city.map((city) => {
                return <Option key={city.id} value={city.value}>{city.name}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="districtCode" className='width250'
          style={{ marginBottom: '20px' }}>
          <Select
            placeholder="请选择区或县"
          >
            {
              xian.map((xian) => {
                return <Option key={xian.id} value={xian.value}>{xian.name}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="hosname"
          className='width250'
          style={{ marginBottom: '20px' }}>
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="hoscode"
          className='width250'
          style={{ marginBottom: '20px' }}>
          <Input
            placeholder="医院编号" />
        </Form.Item>
        <Form.Item
          className='width250'
          style={{ marginBottom: '20px' }}
          name="hostype"

        >
          <Select
            placeholder="医院类型"
          >
            {
              reqType.map((reqType) => {
                return <Option key={reqType.id} value={reqType.value}>{reqType.name}</Option>
              })
            }
          </Select>

        </Form.Item>
        <Form.Item
          className='width250'
          style={{ marginBottom: '20px' }}
          name="status"
        >
          <Select
            placeholder="医院状态"
          >
            <Option>0</Option>
            <Option>1</Option>
          </Select>
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

      <Table
        bordered
        dataSource={dataList}
        columns={columns}
        scroll={{ x: 1300 }}
        rowKey='id'
        loading={loading}
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
