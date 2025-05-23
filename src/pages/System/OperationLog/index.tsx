import { useEffect, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';

const LogOperationEnum: any = {
  10000: '登录',
  20001: '编辑',
  20002: '新增',
  20003: '删除',
  30001: '编辑',
  30002: '新增',
  30003: '删除',
};
export default function Menus() {
  const tableRef: any = useRef('');

  useEffect(() => {}, []);

  // 请求
  async function request(e: any) {
    console.log('e: ', e);
    const list = [
      {
        id: 134,
        operator: 8,
        operatorName: 'admin',
        module: '账号登录',
        description: '登录',
        createdAt: 1747299471000,
        remoteIp: '124.160.59.102',
      },
    ];
    return { data: list, total: list.length, success: true };
  }

  const columns: any = [
    {
      title: '操作页面',
      dataIndex: 'module',
      hideInSearch: true,
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      hideInSearch: true,
      render: (text: any) => <>{LogOperationEnum[text]}</>,
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (text: any) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作IP',
      dataIndex: 'remoteIp',
      search: false,
    },
    {
      title: '创建时间',
      valueType: 'dateRange',
      search: { transform: (value: any) => ({ beginDate: value[0], endDate: value[1] }) },
      hideInTable: true,
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="操作日志"
        rowKey="id"
        columns={columns}
        search={{
          labelWidth: 'auto',
          collapsed: false,
        }}
        request={request}
        actionRef={tableRef}
        options={false}
      />
    </>
  );
}
