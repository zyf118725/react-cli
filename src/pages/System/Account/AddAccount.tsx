import { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { ProFormText, ModalForm, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import { isLocal, wait } from '@/utils';
import { roles } from '@/utils/mock';

export default function AddAccount({ open, setOpen, formData, reload }: any) {
  const [txt, setTxt] = useState('');
  const formRef: any = useRef('');
  console.log('formData: ', formData);

  useEffect(() => {
    setTxt(formData?.id ? '编辑' : '新增');
    if (open) {
      initData();
      getRoles();
    }
  }, [open]);

  // 初始化数据
  const initData = () => {
    formRef?.current?.resetFields();
    // 编辑
    if (formData?.id) {
      const roleIds = formData.roleList.map((item: any) => item.id);
      formRef?.current?.setFieldsValue({
        ...formData,
        password: '',
        roleIds,
      });
    }
    // 新增
    if (isLocal() && !formData?.id) {
      formRef?.current?.setFieldsValue({
        username: 'zhangsan',
        password: '123',
        phone: '1760688939',
      });
    }
  };

  // 提交
  const submit = async () => {
    let value = await formRef?.current?.validateFieldsReturnFormatValue();
    console.log('格式化后的表单数据: ', value);
    value.userType = 1;
    let res: any = await wait(1000);
    console.log('res: ', res);
    if (!res.success) {
      message.error(res?.msg);
      return;
    }
    message.success(txt + '成功');
    reload();
    setOpen(false);
  };

  // 获取角色列表
  async function getRoles() {
    const res: any = await wait(1000);

    console.log('res: 获取角色列表', res);
    const list = roles.map((item: any) => ({
      label: item?.name,
      value: item?.id,
    }));
    return list;
  }

  return (
    <ModalForm
      title={`${txt}账号`}
      formRef={formRef}
      open={open}
      layout="horizontal"
      onFinish={submit}
      onOpenChange={setOpen}
      labelCol={{ span: 4 }}
    >
      <br />
      <ProFormText
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
        placeholder="请输入用户名"
      />
      {!formData?.id && (
        <ProFormText
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
          placeholder="请输入密码"
        />
      )}
      <ProFormSelect
        name="roleIds"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
        placeholder="请选择角色"
        mode="multiple"
        request={getRoles}
      />
      <ProFormText
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        rules={[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
        ]}
      />
      <ProFormText
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: '邮箱格式不正确',
          },
        ]}
      />
      <ProFormTextArea name="address" label="地址" placeholder="请输入地址" />
    </ModalForm>
  );
}
