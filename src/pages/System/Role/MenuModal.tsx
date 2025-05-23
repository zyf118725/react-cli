import { useEffect, useState, useRef } from 'react';
import { Spin } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import { isLocal, wait } from '@/utils';
import type { TreeDataNode } from 'antd';
import MyTree from '@/components/MyTree';
import { LoadingOutlined } from '@ant-design/icons';
import { menusMocks, roleMenusMocks } from '@/utils/mock';

export default function MenuModal({ open, setOpen, formData, reload }: any) {
  const formRef: any = useRef('');
  console.log('formData: ', formData);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<any>({});
  const roleId = formData?.id;

  useEffect(() => {
    if (open) {
      initData();
      // getTreeData();
      // getRoleMenuIds();
      initGetData();
    }
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

  async function initGetData() {
    setLoading(true);
    const promiseres = await Promise.allSettled([getTreeData(), getRoleMenuIds()]);
    console.log('promiseres: ', promiseres);
    setLoading(false);
  }

  // 提交
  const submit = async () => {
    const val = checkedKeys;
    console.log('val: ', val);
    const menuIdList = [...new Set([...val, 1])].filter((item: any) => item !== 0);
    const params = { menuIdList, roleId };
    console.log('params: ', params);
    // // const res: any = await Apis.general.postUserMenuBind({ data: params });
    // console.log('res: ', res);
    // message.success('成功');
    reload();
    setOpen(false);
  };

  // 获取角色对应的ids数据
  async function getRoleMenuIds() {
    await wait(100);
    const obj: any = {
      1: 'admin',
      2: 'yunYing',
    };
    setCheckedKeys(roleMenusMocks[obj[formData?.id]]);
  }

  // 获取菜单数据
  async function getTreeData() {
    setLoading(true);
    await wait(100);
    setLoading(false);
    const list = menusMocks;
    console.log('res: 获取菜单数据', list);
    if (!list) return;
    const _list: any = [
      {
        id: 0,
        name: '根',
        parent: 0,
        path: '/',
        children: list,
      },
    ];
    setTreeData(_list);
  }

  return (
    <ModalForm
      title={`配置菜单`}
      formRef={formRef}
      open={open}
      layout="horizontal"
      onFinish={submit}
      onOpenChange={setOpen}
      labelCol={{ span: 4 }}
    >
      <br />
      {loading && (
        <div className="center" style={{ height: '400px' }}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      )}
      {!loading && (
        <div className="roleMenuTreebox">
          <MyTree treeData={treeData} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
        </div>
      )}
    </ModalForm>
  );
}
