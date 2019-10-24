import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Popconfirm, Card } from 'antd'
import { useDispatch, useSelector } from 'dva'
import { sync } from '../../util'

const {TextArea} = Input

export default Form.create()(props => {
  const dispatch = useDispatch()
  const moods = useSelector(state => state.moods)
  const loading = useSelector(state => state.loading.models.moods)

  const [page, setPage] = useState(1)
  const [visible, setVisible] = useState(false)

  let columns = [
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
                      onConfirm={() => onDelete(record.id)}>
            <Button size="small" htmlType="button">删除</Button>
          </Popconfirm>
        )
      },
    },
  ]

  useEffect(() => {
    sync(async function () {
      await dispatch({
        type: 'moods/queryList',
        payload: {page},
      })
    })
  }, [page])

  const onPageChange = (page) => {
    console.log(page)
    setPage(page.current)
  }

  const handleOk = () => {
    const {form: {validateFields}} = props

    validateFields((err, values) => {
      if (!err) {
        const {form} = props
        sync(async function () {
          await dispatch({
            type: 'moods/add',
            payload: values,
          })
          // 重置
          setVisible(false)
          form.setFieldsValue({
            content: '',
          })
        })
      }
    })
  }

  const onDelete = (id) => {
    sync(async function () {
      await dispatch({
        type: 'moods/delete',
        payload: {id: id, page: moods.page.current},
      })
    })
  }

  const {form: {getFieldDecorator}} = props

  return (
    <Card
      title="每日心情"
    >
      <Button type="primary" style={{marginBottom: '10px'}}
              onClick={() => setVisible(true)}>发表</Button>

      <Table columns={columns} dataSource={moods.list} loading={loading}
             rowKey="id" pagination={moods.page}
             onChange={onPageChange}/>
      <Modal
        title="今天你😊吗？"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
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
})