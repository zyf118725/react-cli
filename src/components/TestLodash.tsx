import { Card } from "antd";
import { cloneDeep, add, intersection } from 'lodash-es';

export default function TestLodash() {
  // 71,
  const a = { a: 1 };
  // 复制
  const b = 1;
  // const b = cloneDeep(a);
  // console.log('b: ', b == a);
  // 算数
  // const c = add(1, 2);
  // console.log('c: ', c);

  // const d = intersection([2, 1, 1], [2, 3], [2, 4]);
  // console.log('d: ', d);


  return (
    <Card>
      测试TestLodash
      复制：{b?.a || 0}
    </Card>
  );
}
