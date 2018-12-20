import { Component } from 'react'
import { LocaleProvider, Layout, Menu, Icon, Card } from 'antd'
import Link from 'umi/link'

const {Header} = Layout

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { connect } from 'dva'
import React from 'react'
import styles from './index.less'

@connect(({users}) => ({
  users,
}))
class BasicLayout extends Component {
  state = {
    current: 'home',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }

  logOut = () => {
    this.props.dispatch({
      type: 'users/logout',
    })
  }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch({
      type: 'users/currentUser',
    })
  }

  render () {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout>

          <Header style={{background: '#fff', padding: 0, height: 'auto',lineHeight:'normal'}}>
            <div className={styles.main}>
            <Menu
              className={styles.left}
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link to="/">
                  <Icon type="home"/>
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="user">
                <Link to="/user">
                  <Icon type="user"/>
                  <span>个人中心</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="verystar">
                <a href="https://pay.verystar.cn" target="_blank"
                   rel="noopener"><Icon type="link"/>VeryPay</a>
              </Menu.Item>
            </Menu>
            <div className={styles.right}>
              <a className={styles.action} href="#" onClick={this.logOut}>退出</a>
            </div>
            </div>
          </Header>
          <div style={{margin: '20px auto', width: 800}}>
            {this.props.children}
          </div>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default BasicLayout