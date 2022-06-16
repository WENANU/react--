import {
    Button,
    Form,
    Input,
    message
} from 'antd';
import { reqHospitalSet } from '@/api/hospital/hospitalSet';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { reqHospitalID } from '@/api/hospital/hospitalSet';
import { reqHospitalSID } from '@/api/hospital/hospitalSet';
import { AxiosUpdatehospitalType } from '@/api/hospital/model/AxiosResponseType';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 18 },
};
const App = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        if (!id) return;
        async function getHospitalID() {
            const re = await reqHospitalID(Number(id))
            form.setFieldsValue(re)
        }
        getHospitalID()
    }, [])
    const onFinish = async (values: AxiosUpdatehospitalType) => {
        if (id) {
            await reqHospitalSID({ ...values, id: +id })
            navigate("/syt/hospital/hospitalSet")
            message.success('修改成功')
        } else {
            await reqHospitalSet(values)
            navigate("/syt/hospital/hospitalSet")
            message.success('添加成功')
        }
    };

    function san() {
        navigate(-1)
    }
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            className='ml mt'
            onFinish={onFinish}
        >
            <Form.Item
                name="hosname"
                label="医院名称"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="hoscode"
                label="医院编号"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="apiUrl"
                label="api基础路径"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="contactsName"
                label="联系人姓名"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="contactsPhone"
                label="联系人手机号"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}  >
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
                <Button htmlType="submit" className='minml' onClick={san} >
                    返回
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;