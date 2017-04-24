import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Card, Col, Row, Checkbox, Form, Input } from 'antd'
import 'antd/dist/antd.css';
const FormItem = Form.Item;
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'hello',
      list: [
        {
          type: 1,
          content: 'abc'
        },
        {
          type: 2,
          content: '123'
        },
        {
          type: 3,
          content: '456'
        },
      ],
    }
  }

  createList(type) {
    return this.state.list.map((item, index) => {
      if (item.type == type) {
        return <div style={{textAlign:'left'}} key={index}><Checkbox checked={item.type == 3} onChange={this.onChangekHandle.bind(this, index)}>{item.content}</Checkbox></div>
      }
    })
  }

  onChangekHandle(index, e) {
    console.log(index)
    let item = this.state.list[index]
    if (item.type < 3) {
      item.type += 1
    }
    //this.setState()
    this.forceUpdate()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.state.list.push({type:1,content:values.content})
        this.forceUpdate()
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div className="App">
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={20}>
            <Col span="8">
              <Card title="TODO" bordered={true}>
                {
                  this.createList(1)
                }
              </Card>
            </Col>
            <Col span="8">
              <Card title="DOING" bordered={true}>
                {
                  this.createList(2)
                }
              </Card>
            </Col>
            <Col span="8">
              <Card title="DONE" bordered={true}>
                {
                  this.createList(3)
                }
              </Card>
            </Col>
          </Row>
          <div style={{ marginTop: '30px' }}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '请输入TODO内容',
                    }]
                  })
                    (<Input placeholder="请输入TODO内容" style={{ width: '500px' }} />)
                }
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">确定</Button>
              </FormItem>
            </Form>
          </div>

        </div>
      </div>

    );
  }
}

export default Form.create()(App);
