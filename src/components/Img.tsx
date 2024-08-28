
import logo from '@/assets/logo.png';

export default function Img() {
  return (
    <div>Img
      <h3>处理图片</h3>
      <div>加载普通图片</div>
      <img src={logo} alt="" />
      <div>加载public的图片</div>
      <img src="/mt.png" alt="" style={{ width: '80px' }} />
    </div>
  );
}
