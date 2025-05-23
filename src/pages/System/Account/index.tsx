import { useRef, useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import AddAccount from './AddAccount';
import { wait } from '@/utils';
import { mockAccounts } from '@/utils/mock';

export default function Account() {
  const tableRef: any = useRef<any>('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // 请求
  const request = async (e: any) => {
    const params: any = {
      ...e,
      size: e?.pageSize,
      type: '0',
      userType: '1',
    };
    console.log('params: ', params);
    await wait(500);
    const list = mockAccounts;
    return { data: list, total: list?.length, success: true };
  };

  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色',
      dataIndex: 'roleIds',
      render: (_, record) => {
        const roles = record?.roleList?.map((item: any) => item.name)?.join('、') || '';
        return roles;
      },
    },

    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record) => {
        return (
          <div key="opt" style={{ marginLeft: -8 }}>
            <Button type="link" size="small" onClick={() => openModal(record)}>
              编辑
            </Button>
            <Popconfirm title="确认删除吗？" onConfirm={() => deleteFn(record?.id)}>
              <Button type="link" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // 删除
  const deleteFn = async (userId: number) => {
    console.log('userId: ', userId);
    // await Apis.general.deleteUserDelete({ params: { userId } });
    message.success('删除成功');
    tableRef.current.reload();
  };

  // 打开弹框
  function openModal(data: any = {}) {
    setOpen(true);
    setFormData(data);
  }

  return (
    <>
      <ProTable
        headerTitle="账号管理"
        rowKey="id"
        columns={columns}
        request={request}
        actionRef={tableRef}
        search={false}
        options={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModal({})}>
            新增账号
          </Button>,
        ]}
      />
      {open && (
        <AddAccount
          open={open}
          setOpen={setOpen}
          formData={formData}
          reload={tableRef?.current?.reload}
        />
      )}
    </>
  );
}
