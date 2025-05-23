import { useRef, useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import AddMenus from './AddMenus';
import { wait } from '@/utils';
import { menusMocks } from '@/utils/mock';

export default function Menus() {
  const tableRef: any = useRef('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [treeData, setTreeData] = useState([]);

  // 请求
  async function request() {
    const res: any = await wait(1000);
    const list: any = menusMocks;
    setTreeData(list);
    return { data: list, total: res?.data?.total, success: true };
  }

  const columns: ProColumns[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: () => <>菜单</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      width: 140,
      fixed: 'right',
      render: (_: any, record: any) => (
        <div key="opt" style={{ marginLeft: -8 }}>
          <Button type="link" size="small" onClick={() => openModal(() => setFormData(record))}>
            编辑
          </Button>
          <Popconfirm title="确认删除吗？" onConfirm={() => deleteFn(record?.id)}>
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // 删除
  const deleteFn = async (id: number) => {
    console.log('id: ', id);
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
        headerTitle="菜单管理"
        rowKey="id"
        columns={columns}
        request={request}
        actionRef={tableRef}
        search={false}
        pagination={false}
        options={false}
        expandable={{ defaultExpandAllRows: true }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModal({})}>
            新增
          </Button>,
        ]}
      />

      {/* 弹框组件 */}
      {open && (
        <AddMenus
          open={open}
          setOpen={setOpen}
          formData={formData}
          reload={tableRef?.current?.reload}
          treeData={treeData}
        />
      )}
    </>
  );
}
