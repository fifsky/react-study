import { Form, Icon, Input, Button, Alert } from 'antd'
import { useDispatch, useSelector } from 'dva'
import styles from './login.less'
import { sync } from '../../util'

const FormItem = Form.Item

export default Form.create()(props => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const loading = useSelector(state => state.loading.models.users)

  const handleSubmit = (e) => {
    e.preventDefault()
    const {form: {validateFields}} = props
    validateFields((err, values) => {
      if (!err) {
        sync(async function () {
          await dispatch({
            type: 'users/login',
            payload: values,
          })
        })
      }
    })
  }

  const renderMessage = content => (
    <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>
  )

  const {getFieldDecorator} = props.form
  return (
    <div className={styles.loginForm}>
      <h2 style={{textAlign: 'center'}}>登录</h2>
      {users.status === 'error' &&
      !loading &&
      renderMessage(users.msg)}
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator('user_name', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password" placeholder="Password"/>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" loading={loading} htmlType="submit"
                  block>登录</Button>
        </FormItem>
      </Form>
    </div>
  )
})