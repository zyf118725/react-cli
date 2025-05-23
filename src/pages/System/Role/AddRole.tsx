import { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { ProFormText, ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { isLocal, wait } from '@/utils';

export default function AddRole({ open, setOpen, formData, reload }: any) {
  const [txt, setTxt] = useState('');
  const formRef: any = useRef('');
  console.log('formData: ', formData);

  useEffect(() => {
    setTxt(formData?.id ? '编辑' : '新增');
    if (open) initData();
  }, [open]);

  // 初始化数据
  const initData = () => {
    formRef?.current?.resetFields();
    if (formData?.id) formRef?.current?.setFieldsValue(formData);
    if (isLocal() && !formData?.id) {
      formRef?.current?.setFieldsValue({
        name: '角色11',
      });
    }
  };

  // 提交
  const submit = async () => {
    message.success('成功111');
    let value = await formRef?.current?.validateFieldsReturnFormatValue();
    console.log('格式化后的表单数据: ', value);
    await wait(1000);
    const res: any = {
      success: true,
    };
    if (!formData?.id) {
      // 新增
      // res = await Apis.general.postUserRoleAdd({ data: value });
    } else {
      // 编辑
      // res = await Apis.general.putUserRoleUpdate({ data: { ...value, id: formData?.id } });
    }
    if (!res.success) {
      message.error(res?.msg);
      return;
    }
    message.success(txt + '成功');
    reload();
    // setOpen(false);
  };

  return (
    <ModalForm
      title={`${txt}角色`}
      formRef={formRef}
      open={open}
      layout="horizontal"
      onFinish={submit}
      onOpenChange={setOpen}
      labelCol={{ span: 4 }}
    >
      <br />
      <ProFormText
        name="name"
        label="角色名称"
        rules={[{ required: true, message: '请输入角色名称' }]}
        placeholder="请输入角色名称"
      />
      <ProFormTextArea label={'描述信息'} name={'description'} />
    </ModalForm>
  );
}
