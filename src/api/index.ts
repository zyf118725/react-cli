import { get } from '@/utils/request';

// export const goodsList = (params = {}) => get('/api/goods/addGoods', params);
// export const addGoodsApi = (params = {}) => post('/nodeApi/goods/addGoods', params);
export const addGoodsApi = (params = {}) => get('/nodeApi/goods/addGoods', params);
