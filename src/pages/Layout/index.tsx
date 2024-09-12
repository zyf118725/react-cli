import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { ProLayout } from '@ant-design/pro-components';
import useRoute from '@/hooks/useRoute';
import { menuList } from '@/routes';
import MyHeader from './Header';


export default function Aside() {
  const { goto, getPageParams } = useRoute();
  const [pathname, setPathname] = useState('');
  const defaultProps = {
    route: {
      path: '/',
      routes: menuList,
    },
    location: { pathname }
  };

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const menuStyle = {
    sider: {
      colorMenuBackground: '#fff',
      colorMenuItemDivider: '#dfdfdf',
      colorTextMenu: '#595959',
      colorTextMenuSelected: 'rgba(42,122,251,1)',
      colorBgMenuItemSelected: 'rgba(230,243,254,1)',
    }
  };

  return (
    <div id="test-pro-layout" style={{ height: '100vh' }} >
      <ProLayout
        title='权限引擎'
        // logo={Img.logo}
        siderWidth={216}
        fixSiderbar={true}
        {...defaultProps}
        token={menuStyle}
        // 自动展开菜单项
        menu={{ defaultOpenAll: true, autoClose: false }}
        menuItemRender={(item, dom) => <div onClick={() => { setPathname(item.path || '/'); goto(item.path || '/'); }}>{dom}</div>}
        // 头部logo的点击事件
        onMenuHeaderClick={(e) => goto('/')}
      >
        <MyHeader />
        <Outlet />
      </ProLayout>
    </div >
  );
}
