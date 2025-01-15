import { get } from '@/utils/request';

export const goodsList = (params = {}) => get('/api/productlist', params); // 获取商品列表
