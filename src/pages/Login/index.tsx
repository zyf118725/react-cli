import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProConfigProvider, ProFormText } from '@ant-design/pro-components';
import { theme } from 'antd';
import useRoute from '@/hooks/useRoute';
import './index.less';

// import styles from './index.module.less';

export default function Login() {
  const a = 1;

  const { goto } = useRoute();
  const { token } = theme.useToken();

  // 登录-不用接口
  async function submit(values: any) {
    localStorage.setItem('userInfo', JSON.stringify(values));
    localStorage.setItem('token', '223456789');
    goto('/m1/caiDan1');
  }

  // 登录-用接口
  async function submitApi(values: any) {
    const { username, password } = values;
    const params = { name: username, password };
    // const res: any = await loginApi(params);
    // console.log('登录-res: ', res);
    // if (res.code === 10000) {
    //   localStorage.setItem('token', res?.data?.token);
    //   localStorage.setItem('userInfo', res?.data?.userInfo);
    //   goto('/m1/caiDan1');
    // }
  }

  return (
    <div className='loginpage'>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            // logo="https://github.githubassets.com/favicons/favicon.png"
            title="北斗后台系统"
            subTitle={'welcome !'}
            onFinish={async (values) => submit(values)}
          // onFinish={async (values) => submitApi(values)}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixI con'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
}
