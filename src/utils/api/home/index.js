/**
 * 首页的所有后端接口
 */
import axios from '../../axios';

// 获取轮播图数据
export function getSwiper() {
  // 返回了一个Promise对象
  return axios.get('/home/swiper')
}

// 获取租房小组
export function getGroup(area = 'AREA%7C88cff55c-aaa4-e2e0') {
  // 返回了一个Promise对象
  return axios.get('/home/groups', {
    // axios规定的写法
    params: {
      area
    }
  })
}

// 获取租房小组
export function getNews(area = 'AREA%7C88cff55c-aaa4-e2e0') {
  // 返回了一个Promise对象
  return axios.get('/home/news', {
    // axios规定的写法
    params: {
      area
    }
  })
}