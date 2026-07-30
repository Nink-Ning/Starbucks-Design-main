import React from 'react';
import {
  Form,
  Modal,
  Input,
  Space,
  Button,
  Grid,
  Select,
  InputNumber,
  Typography,
  Tag,
  Table,
  Message,
} from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false);

  const defaultData = [...new Array(5)].map((_, index) => {
    return {
      key: index,
      name: '星巴克门店 ' + (index + 1),
      salary: 23000,
      email: 'store-' + (index + 1) + '@starbucks.example',
      gender: index % 2 > 0 ? '华东区' : '华南区',
      age: 20 + index,
    };
  });

  function ModalForm(props) {
    return (
      <div>
        <Modal visible title="新增筛选条件" footer={null} onCancel={props.onCancel}>
          <Form id="modalForm" autoComplete="off">
            <Form.Item field="email" label="邮箱">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5 }} label="">
              <Space>
                <Button onClick={props.onCancel}>取消</Button>
                <Button htmlType="submit" type="primary">
                  提交
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  function RefreshForm() {
    return (
      <Form id="refreshForm" layout="inline" style={{ width: 'auto' }}>
        <Form.Item field="keyword">
          <Input.Search placeholder="请输入门店关键词" />
        </Form.Item>
        <Button htmlType="submit">刷新</Button>
      </Form>
    );
  }

  return (
    <div>
      <Form.Provider
        onFormValuesChange={(name, changedValues, info) => {
          console.log('onFormValuesChange: ', name, changedValues, info);
        }}
        onFormSubmit={(name, values, info) => {
          console.log('onFormSubmit: ', name, values, info);

          if (name === 'modalForm') {
            info.forms.searchForm.setFieldsValue({
              email: values.email,
            });
            setVisible(false);
          }

          Message.info({
            icon: <span></span>,
            content: (
              <div style={{ textAlign: 'left' }}>
                <span>表单数据：</span>
                <pre>
                  {JSON.stringify(
                    {
                      ...info.forms.searchForm.getFieldsValue(),
                      ...info.forms.refreshForm.getFieldsValue(),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            ),
          });
        }}
      >
        <Form id="searchForm" layout="vertical">
          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <Form.Item label="门店名称" field="name">
                <Input placeholder="请输入门店名称" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="所属区域" field="gender">
                <Select
                  placeholder="请选择所属区域"
                  options={['全部', '华东区', '华南区', '待确认']}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="运营年限" field="age">
                <InputNumber placeholder="请输入运营年限" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Space>
            <Form.Item field="email" shouldUpdate noStyle>
              {(values) => {
                return <Tag color="green">邮箱：{values.email || '未填写'}</Tag>;
              }}
            </Form.Item>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              新增筛选
            </Button>
          </Space>
        </Form>

        <br />
        <br />
        <Grid.Row justify="space-between" align="center">
          <Typography.Text style={{ fontSize: 18 }} bold>
            查询结果
          </Typography.Text>
          <RefreshForm />
        </Grid.Row>
        <br />
        {visible && (
          <ModalForm
            onCancel={() => {
              setVisible(false);
            }}
          />
        )}
      </Form.Provider>
      <Table
        columns={[
          {
            title: '门店名称',
            dataIndex: 'name',
          },
          {
            title: '销售额',
            dataIndex: 'salary',
          },
          {
            title: '所属区域',
            dataIndex: 'gender',
          },
          {
            title: '运营年限',
            dataIndex: 'age',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
          },
        ]}
        data={defaultData}
      />
    </div>
  );
}
