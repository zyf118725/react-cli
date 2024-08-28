import React, { lazy, Suspense, useState } from 'react';
import Test from '@/components/Test';
import Img from '@/components/Img';
import MyForm from '@/components/MyForm';
import MyFormFZ from '@/components/MyFormFZ';
import { testfn } from '@/utils';
import { Button } from 'antd';
import TestLodash from '@/components/TestLodash';
import Http from '@/components/Http';
// import Button from 'antd/es/button';
import dayjs from 'dayjs';
import './index.less';
import CssModule from '@/components/CssModule';

export default function Home() {
  const [show, setShow] = useState(false);
  const time = dayjs().format('YYYY-MM-DD');
  console.log('time: ', time);

  return (
    <div>Home1234568901333323331233433333w2
      {/* <Img /> */}
      <MyForm />
      {/* <MyFormFZ /> */}
      <Button type='primary'>aa</Button>
      <TestLodash />
      <Test />
      <Http />
      <CssModule />
      <div className='testcss'>实验css前缀</div>
      <h3 onClick={() => setShow(true)}>预加载:点击后加载{show ? 1 : 0}</h3>
      <button onClick={testfn}>testfn</button>
    </div>
  );
}