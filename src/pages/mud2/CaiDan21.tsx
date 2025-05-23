import useRoute from '@/hooks/useRoute';
import { Button } from 'antd';

export default function CaiDan21() {
  const { goto } = useRoute();

  return (
    <div>
      CaiDan21
      <div>
        <Button onClick={() => goto('/m2/detail')}>详情</Button>
      </div>
    </div>
  );
}
