import React, { Component } from 'react';

import { Carousel,Flex,Grid,WingBlank } from 'antd-mobile';

import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGroup,getNews } from '../../utils/api/home';
import './index.scss'
import navs from '../../utils/navs_confing';


class Index extends Component {
  state = {
    swiper: [],
    imgHeight: 212,
    autoPlay: false
  }
  componentDidMount() {
    this.getSwiper()
    this.getGroup()
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
    // 获取首页资讯数据
    getNews = async () => {
      const { status, data } = await getNews();
      status === 200 && this.setState({
        news: data
      })
    }
  getSwiper = async () => {
    const res = await getSwiper()
    const { data, status } = res
    if (status === 200) {
      this.setState({
        swiper: data,
      }, () => {
        this.setState(({
          autoPlay: true
        }))
      })
    }
  }
  getGroup= async ()=>{
    const { status, data } = await getGroup();
    if (status === 200) {
      this.setState({
        grid: data
      })
    }
  }
  render() {
    return (
      <div>
        {/* 轮播图 */}
        <Carousel

          autoplay={this.state.autoPlay}
          infinite
        >
          {this.state.swiper.map(val => (
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
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <Flex className="nav">
      <this.renderNavs />>
      
        </Flex>
        <div className="group">
    <Flex className="group-title" justify="between">
      <h3>租房小组</h3>
      <span>更多</span>
    </Flex>      

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