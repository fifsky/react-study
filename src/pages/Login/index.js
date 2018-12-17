import { Component } from 'react'
import { Form, Icon, Input, Button,Alert } from 'antd'
import { connect } from 'dva'
import styles from "./login.css"

const FormItem = Form.Item

@connect(({ users,loading }) => ({
  users,
  loading: loading.models.users,
}))
@Form.create()
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        let ret = dispatch({
          type: 'users/login',
          payload: values,
        });

      }
    })
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render () {
    const { users,loading } = this.props;
    const {getFieldDecorator} = this.props.form
    return (
      <div className={styles['login-form']}>
        <h2 style={{textAlign:"center"}}>登录</h2>
        {users.status === "error" &&
          !loading &&
          this.renderMessage(users.msg)}
        <Form onSubmit={this.handleSubmit}>
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
            <Button type="primary" loading={loading} htmlType="submit" block>登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Login