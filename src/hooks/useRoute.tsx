import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useRoute() {
  // 路由跳转
  const navigate = useNavigate();
  const goto = (url: string) => navigate(url);

  // 获取路由参数
  const [getParams] = useSearchParams();
  const getPageParams = (name: string) => getParams.get(name);

  return { goto, getPageParams };
}