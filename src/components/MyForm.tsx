import React, { useState } from 'react';
import { testfn } from '@/utils';
import { Form } from 'antd';

export default function MyForm() {
  const [name, setName] = useState('');
  const a = 2;
  const submit = () => {
    console.log('name: ', name);
  };

  return (
    <div>
      <h3>MyForm</h3>
      <button onClick={testfn}>testfn</button>
      <input type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <button onClick={submit}>提交23fasd912dd
      </button>
      <hr />
    </div>
  );
}
