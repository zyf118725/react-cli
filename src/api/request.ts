import axios from 'axios';
// import { getToken } from './auth';
// import { Toast } from 'antd-mobile';

let baseUrl = process.env.REACT_APP_BASEURL;
console.log('baseUrl: ', baseUrl);

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 100000
});

// 请求拦截
instance.interceptors.request.use(function (config) {
  config.headers['X-Auth-Token'] = localStorage.getItem('token'); // 获取token
  config.headers['X-URl'] = config.url; // 方便看url
  return config;
}, function (error) {
  console.log('请求失败拦截-err: ', error);
  return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(function (response) {
  // console.log('响应拦截-suc');
  return response.data;
}, function (error) {
  // Toast.info('响应拦截-err');
  console.log('响应拦截-err', error);
  return Promise.reject(error);
});

export const get = (url: string, params = {}) => instance.get(url, { params });
export const post = (url: string, data = {}) => instance.post(url, data);
export const put = (url: string, data = {}) => instance.put(url, data);