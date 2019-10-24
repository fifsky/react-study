import { Card, Calendar, Row, Col } from 'antd'
import { useSelector } from 'dva'

export default () => {
  const users = useSelector(state => state.users)

  const onPanelChange = (value, mode) => {
    console.log(value, mode)
  }

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
          <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
        </Col>
      </Row>
    </Card>
  )
}