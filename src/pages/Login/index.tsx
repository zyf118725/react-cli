import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProConfigProvider, ProFormText } from '@ant-design/pro-components';
import { theme } from 'antd';
import useRoute from '@/hooks/useRoute';
import './index.less';
import { wait } from '@/utils';
import { menusMocks, roleMenusMocks } from '@/utils/mock';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { userStore, menuPathsStore, tokenStore } from '@/stores';

export default function Login() {
  const setUser = useSetAtom(userStore);
  const setMenuPaths = useSetAtom(menuPathsStore);
  const setToken = useSetAtom(tokenStore);

  const { goto } = useRoute();
  const { token } = theme.useToken();
  const formRef = useRef<any>({});

  useEffect(() => {
    formRef?.current?.setFieldsValue({
      username: 'admin',
      password: '123456',
    });
  }, []);

  // 登录
  async function submitApi(values: any) {
    const { username, password } = values;
    const params = { name: username, password };
    console.log('params: ', params);
    await wait(500);
    // 账号-角色关系 菜单数据 - 模拟
    const obj: any = {
      admin: 'admin',
      test: 'yunYing',
    };
    const menuIds: any = roleMenusMocks[obj[username]];
    console.log('menuIds: ', menuIds);
    const menuPathsList = getPathsByMenu(menusMocks, menuIds);
    localStorage.setItem('menuIds', JSON.stringify(menuIds));
    setMenuPaths(menuPathsList);
    setUser({ name: username });
    setToken('12345678');
    goto('/m1/caiDan1');
  }

  // 根据菜单id获取菜单path
  function getPathsByMenu(menuTree: any[], menuIds: any[]) {
    const paths: string[] = [];
    menuTree.forEach((item: any) => diGui(item));
    function diGui(menuItem: any, parentPath?: string) {
      if (menuIds.includes(menuItem?.id)) {
        if (parentPath) paths.push(...parentPath.split(','));
        paths.push(menuItem?.path);
      }
      if (menuItem?.children?.length > 0) {
        menuItem?.children.forEach((item: any) => {
          const _path = parentPath ? `${parentPath},${menuItem?.path}` : menuItem?.path;
          diGui(item, _path);
        });
      }
    }
    return paths;
  }

  return (
    <div className="loginpage">
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            // logo="https://github.githubassets.com/favicons/favicon.png"
            title="北斗后台系统"
            subTitle={'welcome !'}
            formRef={formRef}
            onFinish={async (values) => submitApi(values)}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码'}
              rules={[{ required: true, message: '请输入密码！' }]}
            />
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
}
