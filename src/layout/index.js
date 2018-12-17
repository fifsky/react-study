import { Component } from 'react';
import { LocaleProvider, Layout, Menu, Icon,Button } from 'antd';
import Link from 'umi/link';

const { Header, Footer, Sider, Content } = Layout;

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'dva'


// 引入子菜单组件
const SubMenu = Menu.SubMenu;

@connect(({ users,loading }) => ({
  users,
  loading: loading.models.users,
}))
export default class BasicLayout extends Component {

  logOut = () => {
    this.props.dispatch({
      type: 'users/logout',
    });
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px',color:"#fff",lineHeight:"32px",textAlign:"center",fontWeight:"bold"}}>VeryStar</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}
            >
                <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header
            <Button onClick={this.logOut}>退出</Button>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
      </LocaleProvider>
    )
  }
}