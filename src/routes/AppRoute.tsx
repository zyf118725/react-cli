import { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { routes, routerConfig } from './index';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import '@/assets/reset.less';

export default function AppRoute() {
  const MySuspense = (Dom: any) => <Suspense fallback={<p></p>}> {Dom} </Suspense>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={routerConfig?.defaultRoute} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {routes.map((item: any, i: number) => (
            <Route key={i} path={item.path} element={MySuspense(<item.element />)} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
