import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
export default function MyHeader() {
  const [open, setOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div key="logout" onClick={() => setOpen(true)}>
          <LogoutOutlined /> 退出登录
        </div>
      ),
    },
  ];

  return (
    <div className={styles.headerwrap}>
      <p></p>
      <div className={styles.right}>
        <Dropdown className="action" menu={{ items }}>
          <Space>
            <UserOutlined />
            <span className="name">张三</span>
          </Space>
        </Dropdown>
      </div>
      {open && <LogoutModal open={open} setOpen={setOpen} />}
    </div>
  );
}
