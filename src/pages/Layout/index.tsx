import { useState } from 'react';
import { ProLayout } from '@ant-design/pro-components';
import useRoute from '@/hooks/useRoute';
import MyHeader from './Header';

export default function Layout({ defaultProps, children }: any) {
  const { goto } = useRoute();
  const [pathname, setPathname] = useState(window.location.pathname);
  console.log('defaultProps: ', defaultProps);

  const menuStyle = {
    sider: {
      colorMenuBackground: '#fff',
      colorMenuItemDivider: '#dfdfdf',
      colorTextMenu: '#595959',
      colorTextMenuSelected: 'rgba(42,122,251,1)',
      colorBgMenuItemSelected: 'rgba(230,243,254,1)',
    },
  };

  return (
    <>
      <div id="test-pro-layout" style={{ height: '100vh' }}>
        <ProLayout
          title="后台系统"
          // logo={Img.logo}
          siderWidth={216}
          fixSiderbar={true}
          {...defaultProps}
          // route={{path: '/', routes: menuList }}
          location={{ pathname }}
          token={menuStyle}
          menu={{ defaultOpenAll: true, autoClose: false }}
          menuItemRender={(item: any, dom: any) => (
            <div
              onClick={() => {
                setPathname(item.path || '/');
                goto(item.path || '/');
              }}
            >
              {dom}
            </div>
          )}
          onMenuHeaderClick={() => goto('/')}
        >
          <MyHeader />
          {children}
          {/* <Outlet /> */}
        </ProLayout>
      </div>
    </>
  );
}
