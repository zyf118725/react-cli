import React, { lazy, Suspense, useState } from 'react';
import Test from '@/components/Test';
import Img from '@/components/Img';
import MyForm from '@/components/MyForm';
import MyFormFZ from '@/components/MyFormFZ';
import { testfn } from '@/utils';
import { Button, Card } from 'antd';
import TestLodash from '@/components/TestLodash';
import Http from '@/components/Http';
import dayjs from 'dayjs';
import './index.less';
import CssModule from '@/components/CssModule';

export default function Home() {
  const [show, setShow] = useState(false);
  const time = dayjs().format('YYYY-MM-DD');
  console.log('time: ', time);

  return (
    <div>
      <Card>
        欢迎来到xxx平台。
      </Card>
    </div>
  );
}