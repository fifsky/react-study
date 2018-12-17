import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd'
import { connect } from 'dva'
import { sync } from '../../util'
import { deleteApi } from '../../service'

const {TextArea} = Input

@connect(({moods, loading}) => ({
  moods,
  loading: loading.models.moods,
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
      width: '5%',
    },
    {
      title: '作者',
      dataIndex: 'user.name',
    },
    {
      title: '心情',
      dataIndex: 'content',
      width: '50%',
    },
    {
      title: '日期',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?"
                      onConfirm={() => this.onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      },
    },
  ];

  load(page){
    return this.props.dispatch({
       type: 'moods/queryList',
       payload: {page},
     })
  }

  componentDidMount () {
    let self = this
    sync(function * () {
      yield self.load(1)
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
        dispatch({
          type: 'moods/add',
          payload: values,
        })
        // 重置
        this.setState({visible: false, content: ''})
        const {form} = this.props
        form.setFieldsValue({
          content: '',
        })
      }
    })
  }

  onDelete = (id) => {
    let self = this
    sync(function * () {
      yield deleteApi({id: id})
      yield self.load(1)
    })
  }

  render () {
    const {visible} = this.state
    const {moods, loading} = this.props
    const {form: {getFieldDecorator}} = this.props

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>发表</Button>
        <Table columns={this.columns} dataSource={moods.list} loading={loading}
               rowKey="id"/>
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
      </div>
    )
  }
}

export default List