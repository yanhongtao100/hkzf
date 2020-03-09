
import axios from 'axios';
import { Toast } from 'antd-mobile';
const BASE_URL = 'http://api-haoke-dev.itheima.net'

const axios_my = axios.create({
  baseURL: BASE_URL
});


// 拦截器
// Add a request interceptor
axios_my.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading('加载中...', 0)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios_my.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.hide()
  const {status,body,description} = response.data;
  const data ={
    status,
    data:body,
    description

  }
  return data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default axios_my;