/**
 * 默认首页
 */
import React, { Component } from 'react';

import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';

import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGroup, getNews } from '../../utils/api/home';

// 导入首页样式
import './index.scss';
import navs from '../../utils/navs_confing';

const data1 = Array.from(new Array(4)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

class Index extends Component {
  state = {
    // 轮播图的数据
    swiper: [],
    // 宫格数据
    grid: [],
    // 资讯列表数据
    news: [],
    // 处理调用后端接口后，不自动播放的问题
    autoPlay: false,
    // 设置了轮播图的高度,默认占位
    imgHeight: 212,
  }
  componentDidMount() {
    this.getSwiper();
    this.getGroup();
    this.getNews()
  }

  // 获取轮播图的数据
  getSwiper = async () => {
    const { status, data } = await getSwiper();
    if (status === 200) {
      // setState()异步
      this.setState({
        swiper: data
      }, () => {
        // 有数据之后，再设置自动播放
        this.setState(({
          autoPlay: true
        }))
      })

    }
  }

  // 获取租房小组的数据
  getGroup = async () => {
    const { status, data } = await getGroup();
    if (status === 200) {
      this.setState({
        grid: data
      })
    }
  }

  // 获取首页资讯数据
  getNews = async () => {
    const { status, data } = await getNews();
    status === 200 && this.setState({
      news: data
    })
  }

  // 渲染轮播图
  renderSwiper = () => {
    return this.state.swiper.map(val => (
      <a
        key={val.id}
        href="http://www.itheima.com"
        style={{ display: 'inline-block', width: '100%', background: 'gray', height: this.state.imgHeight }}
      >
        <img
          src={`${BASE_URL}${val.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            // 根据窗口做自适应
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
  }

  // 渲染栏目导航
  renderNavs = () => {
    return navs.map((item) => {
      return <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
        <img src={item.img} />
        <p>{item.title}</p>
      </Flex.Item>
    })
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div>
        {/* 轮播图 */}
        <Carousel
          // 自动播放
          autoplay={this.state.autoPlay}
          // 循环播放
          infinite
        >
          {/* 列表渲染 */}
          {
            this.renderSwiper()
          }
        </Carousel>
        {/* 栏目导航 */}
        <Flex className="nav">
          {
            this.renderNavs()
          }
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          {/* title */}
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格布局 */}
          <Grid
            // 宫格数据
            data={this.state.grid}
            hasLine={false}
            square={false}
            // 宫格的列数
            columnNum={2}
            // 自定义宫格的内容
            renderItem={item => (
              // item结构
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
          {/* 资讯 */}
          <div className="news">
            <h3 className="group-title">最新资讯</h3>
            <WingBlank size="md">{this.renderNews()}</WingBlank>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;