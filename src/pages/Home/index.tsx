import { addGoodsApi } from '@/api';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    addGoods();
  }, []);

  async function addGoods() {
    const res: any = await addGoodsApi();
    console.log('addGoods-addGoods', res);
  }

  return <div>Home</div>;
}
