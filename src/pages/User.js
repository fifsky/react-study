import { Card,Calendar,Row, Col } from 'antd';
import { connect } from 'dva'
import { Component } from 'react'

@connect(({users}) => ({
  users,
}))
class User extends Component {

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }

  render() {
    const {users} = this.props
    console.log(users)
    return (
    <Card
      title="个人中心"
      style={{width: 800}}
    >
      <p>用户：{users.data.name}</p>
      <p>邮箱：{users.data.email}</p>
      <p>注册时间：{users.data.created_at}</p>
      <Row>
        <Col>
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </Col>
      </Row>
    </Card>
    )
  };
}

export default User
