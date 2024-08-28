import { post, get } from "./request";

export const goodsList = (params = {}) => get("/api/productlist", params); // 获取商品列表
