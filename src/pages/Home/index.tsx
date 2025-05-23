import { useEffect } from 'react';
import { goodsList } from '@/api';
import { Button, message } from 'antd';

export default function Home() {
  useEffect(() => {
    getData();
  }, []);

  // 获取数据
  const getData = async () => {
    const res: any = await goodsList({});
    console.log('res: ', res);
  };

  return (
    <div>
      Home
      <Button onClick={() => message.success('成功')}>msg</Button>
    </div>
  );
}
