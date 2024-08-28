import { Card } from "antd";
import { goodsList } from '@/api';
import { useEffect } from "react";
export default function Http() {

  useEffect(() => {
    getData();
    // console.log('process: ', process); // 报错
    console.log('process:.env ', process.env); // 报错
    console.log('====http:NODE_ENV,', process.env.NODE_ENV); // 不报错
    console.log('====http:REACT_APP_ENV,', process.env.REACT_APP_ENV);
  }, []);

  // 获取数据
  const getData = async () => {
    try {
      const res: any = await goodsList({});
      console.log('res: ', res);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Card>
      Http
    </Card>
  );
}
