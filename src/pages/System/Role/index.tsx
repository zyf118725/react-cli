import { useRef, useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import AddRole from './AddRole';
import MenuModal from './MenuModal';
import { roles } from '@/utils/mock';

export default function Role() {
  const tableRef: any = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [openMenu, setOpenMenu] = useState(false);

  // 请求
  const request = async (value: any) => {
    console.log('value: ', value);
    // const res: any = await Apis.general.getUserRolePage(params);
    // if (!res?.success) return { data: [], total: 0 };
    const list: any = roles;
    return { data: list, total: list.length, success: true };
  };

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
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
            <Button type="link" size="small" onClick={() => openMenuModal(record)}>
              菜单配置
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
  const deleteFn = async (roleId: number) => {
    console.log('roleId: ', roleId);
    tableRef.current.reload();
  };

  // 打开弹框
  function openModal(data: any = {}) {
    setOpen(true);
    setFormData(data);
  }

  // 打开弹框
  function openMenuModal(data: any = {}) {
    setOpenMenu(true);
    setFormData(data);
  }

  return (
    <>
      <ProTable
        headerTitle="角色管理"
        rowKey="id"
        columns={columns}
        request={request}
        actionRef={tableRef}
        search={false}
        options={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModal({})}>
            新增角色
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              console.log(9999);
              message.success('新增角色2');
            }}
          >
            新增角色2
          </Button>,
        ]}
      />

      {open && (
        <AddRole
          open={open}
          setOpen={setOpen}
          formData={formData}
          reload={tableRef?.current?.reload}
        />
      )}
      {openMenu && (
        <MenuModal
          open={openMenu}
          setOpen={setOpenMenu}
          formData={formData}
          reload={tableRef?.current?.reload}
        />
      )}
    </>
  );
}
