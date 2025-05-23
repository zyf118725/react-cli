import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { createMenusByPaths, createRoutes } from './index';
import { useAtomValue } from 'jotai';
import { menuPathsStore } from '@/stores';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import NotFoundPage from '@/pages/404';

// 是否需要权限控制
const ISAUTH = false;
const defaultRoute = '/home';

export default function AppRoute() {
  const MySuspense = (Dom: any) => <Suspense fallback={<p></p>}> {Dom} </Suspense>;
  const [newMeuns, setNewMeuns] = useState<any>([]);
  const [routes, setRoutes] = useState<any>([]);
  const menuPaths = useAtomValue(menuPathsStore);
  // const token = useAtomValue(tokenStore);
  const token = '123'; // 测试

  // 如果需要权限控制
  useEffect(() => {
    if (!ISAUTH || (ISAUTH && menuPaths?.length)) {
      setRoutes(createRoutes(menuPaths, ISAUTH));
      setNewMeuns(createMenusByPaths(menuPaths, ISAUTH));
    }
  }, [menuPaths, ISAUTH]);

  const defaultProps = {
    route: {
      path: '/',
      routes: newMeuns,
    },
    location: { pathname: window.location.pathname },
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {token ? (
          <>
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />
            {routes?.length &&
              routes.map((route: any) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout defaultProps={defaultProps}>{MySuspense(<route.element />)}</Layout>
                  }
                />
              ))}
            {routes?.length > 0 && <Route path="*" element={<NotFoundPage />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        {/* 旧的写法 */}
        {/* <Route path="/" element={<Layout defaultProps={defaultProps} />}>
          {routes.map((route: any, i: number) => (
            <Route key={i} path={route.path} element={MySuspense(<route.element />)} />
          ))}
        </Route> */}
      </Routes>
    </Router>
  );
}
