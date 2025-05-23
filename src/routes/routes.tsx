import React, { lazy } from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

// 配置路由和菜单列表
export const allRouteList: any[] = [
  {
    path: '/home',
    name: '首页',
    icon: <AppstoreOutlined />,
    hideInMenu: false,
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/m1',
    name: '模块1',
    icon: <AppstoreOutlined />,
    children: [
      {
        path: '/m1/caidan1',
        name: '菜单1',
        component: lazy(() => import('@/pages/mud1/CaiDan1')),
      },
      {
        path: '/m1/caidan2',
        name: '菜单2',
        component: lazy(() => import('@/pages/mud1/CaiDan2')),
      },
    ],
  },
  {
    path: '/m2',
    name: '模块2',
    icon: <AppstoreOutlined />,
    children: [
      {
        path: '/m2/caidan1',
        name: '菜单1',
        component: lazy(() => import('@/pages/mud2/CaiDan1')),
      },
      {
        path: '/m2/caidan2',
        name: '菜单2',
        children: [
          {
            path: '/m2/caidan2/caidan21',
            name: '菜单21',
            component: lazy(() => import('@/pages/mud2/CaiDan21')),
          },
          {
            path: '/m2/caidan2/caidan22',
            name: '菜单22',
            component: lazy(() => import('@/pages/mud2/CaiDan22')),
          },
          {
            path: '/m2/detail',
            name: '菜单2详情',
            hideInMenu: true,
            component: lazy(() => import('@/pages/mud2/Detail')),
          },
        ],
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: <SettingOutlined />,
    hideInMenu: false,
    children: [
      {
        path: '/system/role',
        name: '角色管理',
        component: lazy(() => import('@/pages/System/Role')),
      },
      {
        path: '/system/menu',
        name: '菜单管理',
        component: lazy(() => import('@/pages/System/Menu')),
      },
      {
        path: '/system/account',
        name: '账号管理',
        component: lazy(() => import('@/pages/System/Account')),
      },
      {
        path: '/system/operationLog',
        name: '操作日志',
        component: lazy(() => import('@/pages/System/OperationLog')),
      },
    ],
  },
];

// 生成动态菜单列表
export function createMenusByPaths(paths: string[], ISAUTH = false) {
  const menus: any = [];
  function digui(menuIem: any, paths: string[]) {
    const { icon, path, name, children, hideInMenu } = menuIem;
    // 判断是否需要权限
    if ((ISAUTH && !paths.includes(path)) || hideInMenu) return null;
    const tmp: any = { name, path };
    if (icon) tmp.icon = icon;
    const _children: any = [];
    if (children?.length) {
      children.forEach((child: any) => {
        const obj = digui(child, paths);
        if (obj) _children.push(obj);
      });
    }
    if (_children?.length) tmp.children = _children;
    return tmp;
  }
  allRouteList.forEach((menu: any) => {
    const tmp = digui(menu, paths);
    if (tmp) menus.push(tmp);
  });
  return menus;
}

// 路由列表-数组扁平化
interface RouteType {
  path: string;
  component?: React.ReactNode;
  children?: RouteType;
  hideInMenu?: boolean;
  [key: string]: any;
}

// 路由列表扁平化-一维数组
function getFlatRoutes(routeList: RouteType[] = []): RouteType[] {
  const routes: any = []; // 所有路由
  routeList.forEach((item: any) => {
    const { path, component, children, hideInMenu } = item;
    const routeObj: RouteType = { path };
    if (hideInMenu) routeObj.hideInMenu = true;
    if (component) {
      routeObj.element = component;
      routes.push(routeObj);
    }
    if (children?.length) {
      routes.push(...getFlatRoutes(children));
    }
  });
  return routes;
}

// 生成路由列表-数组扁平化
export function createRoutes(paths: any = [], ISAUTH = false) {
  const flatRoutes = getFlatRoutes(allRouteList);
  // 判断是否需要权限
  const routes = !ISAUTH
    ? flatRoutes
    : flatRoutes.filter((item: any) => paths.includes(item?.path) || item?.hideInMenu);
  // console.log('routes: ', routes);
  return routes;
}
