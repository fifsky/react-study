import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input, Popconfirm, Card } from 'antd'
import { connect } from 'dva'
import { sync } from '../../util'
import { deleteApi } from '../../service'
import co from 'co'

const {TextArea} = Input

@connect(({moods, loading}) => ({
  moods,
  loading: loading.models.moods,
}))
@connect(({users, loading}) => ({
  users,
  loading: loading.models.users,
}))
@Form.create()
class List extends Component {
  state = {
    visible: false,
    content: '',
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: '作者',
      dataIndex: 'user.name',
      width: '12%',
    },
    {
      title: '心情',
      dataIndex: 'content',
    },
    {
      title: '日期',
      dataIndex: 'created_at',
      width: '30%',
    },
    {
      title: '操作',
      width: '10%',
      render: (text, record) => {
        return (
          <Popconfirm title="确认删除?"
                      onConfirm={() => this.onDelete(record.id)}>
            <Button size="small">删除</Button>
          </Popconfirm>
        )
      },
    },
  ]

  logOut = () => {
    this.props.dispatch({
      type: 'users/logout',
    })
  }

  load = (page) => {
    return this.props.dispatch({
      type: 'moods/queryList',
      payload: {page},
    })
  }

  onPageChange = (page) => {
    let self = this
    sync(function * () {
      yield self.load(page.current)
    })
  }

  componentDidMount () {
    let self = this
    const {moods} = this.props
    sync(function * () {
      yield self.load(moods.page.current)
    })
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = () => {
    const {dispatch, form: {validateFields}} = this.props

    validateFields((err, values) => {
      if (!err) {
        const {form} = this.props
        let self = this
        sync(function * () {
          yield dispatch({
            type: 'moods/add',
            payload: values,
          })
          // 重置
          self.setState({visible: false, content: ''})
          form.setFieldsValue({
            content: '',
          })
        })
      }
    })
  }

  onDelete = (id) => {
    const {moods, dispatch} = this.props
    sync(function * () {
      yield dispatch({
        type: 'moods/delete',
        payload: {id: id, page: moods.page.current},
      })
    })
  }

  render () {
    const {visible} = this.state
    const {moods, loading} = this.props
    const {form: {getFieldDecorator}} = this.props

    return (
      <Card
        title="每日心情"
        extra={<a href="#" onClick={this.logOut}>退出</a>}
      >
        <Button type="primary" style={{marginBottom: '10px'}}
                onClick={this.showModal}>发表</Button>

        <Table columns={this.columns} dataSource={moods.list} loading={loading}
               rowKey="id" pagination={moods.page}
               onChange={this.onPageChange}/>
        <Modal
          title="今天你😊吗？"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            {getFieldDecorator('content', {
              rules: [{required: true}],
            })(
              <TextArea rows={4} autoFocus placeholder='说点什么……'/>,
            )}
          </Form>
        </Modal>
      </Card>
    )
  }
}

export default List