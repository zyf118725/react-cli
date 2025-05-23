import { Button, Result } from 'antd';

export default function NotFoundPage() {
  return (
    <div style={{ paddingTop: '16vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="阿哦，页面走丢了~"
        extra={
          <Button type="primary" onClick={() => (window.location.href = '/')}>
            回到首页
          </Button>
        }
      />
    </div>
  );
}
