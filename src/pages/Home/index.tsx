import React, { useEffect } from 'react';
import { goodsList } from '@/api';

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
    <div>Home</div>
  );
}
