import { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'antd';
import { ProForm, ProFormCascader, ProFormTextArea, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit, ProFormMoney, ProFormSelect, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';

// 表单样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function MyForm() {
  const formRef: any = useRef();
  useEffect(() => {
    initData();
  }, []);

  // 初始化数据
  const initData = () => {
    formRef.current.setFieldsValue({ name: '张三' });
  };

  // 提交
  const submit = async () => {
    let allFormData = formRef?.current?.getFieldFormatValueObject();
    console.log('表单数据: ', allFormData);
    let formatData = await formRef?.current?.validateFieldsReturnFormatValue();
    console.log('格式化后的表单数据: ', formatData);
  };

  // 重置
  const reset = () => {
    formRef?.current?.resetFields();
  };

  return (
    <Card>
      <ProForm
        title="新建表单"
        formRef={formRef}
        layout="horizontal"
        {...formItemLayout}
        submitter={{ render: false }}
      >
        <ProFormText
          name="name"
          label="商品名称"
          placeholder="请输入商品名称"
        // rules={[{ required: true }]}
        />
        <ProFormDatePicker name="date" label="日期" />
        <ProFormDateRangePicker name="dateRange" label="日期"
          transform={(val) => {
            return {
              startDate: val ? val[0] : null,
              endDate: val ? val[1] : null,
            };
          }}
        />
        <Form.Item wrapperCol={{ offset: 6, span: 16, }} >
          <Button onClick={reset}>重置</Button> &nbsp;
          <Button type='primary' onClick={submit}>提交</Button>
        </Form.Item>
      </ProForm>
    </Card>
  );
};