import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 1. 普通用法
export const themeAtom = atom<any>(''); // 默认无

// 2. 状态持久化用法-存用户信息
export const userStore = atomWithStorage('user', 'zs');
