import { useEffect, useState, useRef } from 'react';
import { message, TreeSelect } from 'antd';
import { ProFormText, ModalForm, ProForm } from '@ant-design/pro-components';
import { isLocal, wait } from '@/utils';

export default function AddMenus({ open, setOpen, formData, reload, treeData }: any) {
  const [txt, setTxt] = useState('');
  const formRef: any = useRef('');

  useEffect(() => {
    setTxt(formData?.id ? '编辑' : '新增');
    if (open) initData();
  }, [open]);

  // 初始化数据
  const initData = () => {
    formRef?.current?.resetFields();
    if (formData?.id) {
      formRef?.current?.setFieldsValue(formData);
    } else {
      const menuType = 'menu';
      formRef?.current?.setFieldsValue({
        type: menuType,
        name: '',
        hidden: false,
      });
      // 本地测试
      if (isLocal()) {
        formRef?.current?.setFieldsValue({
          name: '菜单1',
          path: '/testcd1',
        });
      }
    }
  };

  // 提交
  const submit = async () => {
    let value = await formRef?.current?.validateFieldsReturnFormatValue();
    value.code = value.path;
    value.type = 'menu';
    let res: any = await wait(1000);
    if (!formData?.id) {
      // 新增
      // res = await Apis.general.postUserMenuAdd({ data: value });
    } else {
      // 编辑
      value.id = formData?.id;
      // res = await Apis.general.putUserMenuUpdate({ data: value });
    }
    if (!res.success) {
      message.error(res?.msg);
      return;
    }
    message.success(txt + '成功');
    reload();
    setOpen(false);
  };

  const getTreeData = (data: any) => {
    const list = data.map((item: any) => {
      const tmpChildren = item?.children?.map((value: any) => ({
        key: value.id,
        name: value.name,
        id: value.id,
      }));
      return {
        ...item,
        children: tmpChildren && tmpChildren.length > 0 ? tmpChildren : [],
      };
    });
    return list;
  };

  return (
    <ModalForm
      title={`${txt}表单`}
      formRef={formRef}
      open={open}
      layout="horizontal"
      onFinish={submit}
      onOpenChange={setOpen}
      labelCol={{ span: 4 }}
    >
      <br />
      <ProFormText name="name" label="标题" rules={[{ required: true }]} placeholder="请输入标题" />
      <ProFormText
        name="path"
        label="路由地址"
        rules={[{ required: true }]}
        placeholder="请输入路由地址"
      />
      <ProForm.Item label="上级目录" name="parent" rules={[{ required: true }]}>
        <TreeSelect
          placeholder="请选择上级目录"
          allowClear
          treeData={getTreeData(treeData)}
          filterTreeNode
          showSearch
          autoClearSearchValue
          treeNodeFilterProp={'title'}
          treeDefaultExpandAll
          treeLine={{ showLeafIcon: false }}
          fieldNames={{
            label: 'name',
            value: 'id',
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
}
