import axios from 'axios';
import { showMessage } from "./status";   // 引入状态码文件
import { showToast } from 'vant'  // 引入el 提示框，这个项目里用什么组件库这里引什么
import router from '../router/index';

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = import.meta.env.BASE_URL;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 配置请求头
    if(!config.headers.get("Content-Type")){
      config.headers.set('Content-Type','application/json;charset=UTF-8')
    }
    config.headers.set('token',sessionStorage.getItem('token'))
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);           // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      showToast('网络连接异常,请稍后再试!');
    }
  }
);

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST') {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params
      })
    } else if (type.toUpperCase() === 'FORM') {
      promise = axios({
        method: 'POST',
        headers:{ 'content-type': 'application/x-www-form-urlencoded' },
        url,
        data: params,
      })
    } 
    //处理返回
    promise?.then(res => {
      // 跳转到登录页
      if(res.data && res.data.code === -2){
        router.push({
          path:'/login',
        });
      } else {
        resolve(res);
      }
    }).catch(err => {
      reject(err)
    })
  })
}
