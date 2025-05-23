// 菜单tree数据-模拟
export const menusMocks: any = [
  {
    id: 1,
    name: '首页',
    path: '/home',
  },
  {
    id: 2,
    name: '系统管理',
    path: '/system',
    children: [
      {
        id: 21,
        name: '角色管理',
        path: '/system/role',
      },
      {
        id: 22,
        name: '菜单管理',
        path: '/system/menus',
      },
      {
        id: 23,
        name: '账号管理',
        path: '/system/account',
      },
      {
        id: 24,
        name: '操作日志',
        path: '/system/operationLog',
      },
    ],
  },
  {
    id: 3,
    name: '模块1',
    path: '/m1',
    children: [
      {
        id: 31,
        name: '菜单1',
        path: '/m1/caidan1',
      },
      {
        id: 32,
        name: '菜单2',
        path: '/m1/caidan2',
      },
    ],
  },
  {
    id: 4,
    name: '模块2',
    path: '/m2',
    children: [
      {
        id: 41,
        name: '菜单1',
        path: '/m2/caidan1',
      },
      {
        id: 42,
        name: '菜单1',
        path: '/m2/caidan2',
        children: [
          {
            id: 421,
            name: '菜单21',
            path: '/m2/caidan2/caidan21',
          },
          {
            id: 422,
            name: '菜单22',
            path: '/m2/caidan2/caidan22',
          },
        ],
      },
    ],
  },
];

// 角色数据-模拟
export const roles: any = [
  {
    id: 1,
    name: '超级管理员',
    description: '超级管理员',
  },
  {
    id: 2,
    name: '运营',
    description: '运营',
  },
];

// 角色菜单数据-模拟
export const roleMenusMocks: any = {
  // admin: [1, 2, 21, 22, 23, 24, 3, 31, 32, 421],
  admin: [1, 31, 421],

  yunYing: [1, 2, 21, 22, 23, 24, 31],
};

// 账号数据-模拟
export const mockAccounts = [
  {
    id: 8,
    username: 'admin',
    email: null,
    phone: '17607328773',
    createdAt: 1733215506000,
    updatedAt: 1741834496000,
    nickName: '测试',
    isVerified: false,
    roleList: [
      {
        id: 1,
        name: '超级管理员',
        code: 'ADMIN1',
        description: '超级管理员',
      },
    ],
  },
  {
    id: 59,
    username: 'test',
    email: null,
    phone: '13767677777',
    createdAt: 1741921558000,
    updatedAt: 1741921558000,
    companyName: null,
    creditCode: null,
    businessLicense: null,
    approvalStatus: null,
    nickName: '销售',
    headPicPresignUrl: null,
    roleList: [
      {
        id: 1,
        name: '运营',
        code: 'ADMIN1',
        description: '运营',
      },
    ],
  },
];
