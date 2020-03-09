import React, { Component } from 'react';
import { Route} from 'react-router-dom'

import { TabBar } from 'antd-mobile';
import './index.css';
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';
import tabItems from '../../utils/tabBar_config';


class Home extends Component {



  state = {
    selectedTab: this.props.location.pathname,
  }



  renderTabItems = () => {
    return tabItems.map((item) => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.title}
          icon={<i className={`iconfont ${item.icon}`} />}

          selectedIcon={
            <i className={`iconfont ${item.icon}`} />
          }
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.props.history.push(item.path)
            this.setState({
              selectedTab: item.path,
            });
          }}
        >
        </TabBar.Item>
      )
    })
  }


  render() {
    console.log(this.props)
    return (
      <div className="home">
        <Route path="/home" exact component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        <div className="barBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"

          >
            {
              this.renderTabItems()
            }

          </TabBar>
        </div>

      </div>
    );
  }
}

export default Home;