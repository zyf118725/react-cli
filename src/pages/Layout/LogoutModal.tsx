import { message, Modal } from 'antd';
import useRoute from '@/hooks/useRoute';

export default function LogoutModal({ open, setOpen }: any) {
  const { goto } = useRoute();

  const okHandle = () => {
    setOpen(false);
    message.success('退出登录成功');
    localStorage.clear();
    goto('/login');
  };

  return (
    <Modal
      title="退出登录"
      open={open}
      onOk={okHandle}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      width={320}
    >
      <div>确定退出登录?</div>
    </Modal>
  );
}
