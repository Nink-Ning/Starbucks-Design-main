import React from 'react';
import {
  Form,
  Radio,
  Input,
  AutoComplete,
  DatePicker,
  TimePicker,
  Cascader,
  Select,
  InputNumber,
  TreeSelect,
} from '@sbux/starbucks-design-react';

export default function Demo() {
  const [status, setStatus] = React.useState('error');
  const [size, setSize] = React.useState('default');
  return (
    <div style={{ width: '100%' }}>
      <Form labelCol={{ span: 8 }} autoComplete="off" wrapperCol={{ span: 16 }} size={size}>
        <div>
          <Radio.Group
            value={status}
            type="button"
            onChange={setStatus}
            options={[
              { label: '校验中', value: 'validating' },
              { label: '成功', value: 'success' },
              { label: '错误', value: 'error' },
              { label: '预警', value: 'warning' },
            ]}
          ></Radio.Group>
          <br />
          <br />

          <Radio.Group
            type="button"
            onChange={setSize}
            options={[
              { label: '迷你', value: 'mini' },
              { label: '小号', value: 'small' },
              { label: '默认', value: 'default' },
              { label: '大号', value: 'large' },
            ]}
          ></Radio.Group>
        </div>
        <br />
        <Form.Item
          hasFeedback
          validateStatus={status}
          help="自定义校验提示"
          extra="额外说明"
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={status}
          help="自定义校验提示"
          extra="额外说明"
        >
          <div>
            <Input placeholder="请输入..." allowClear />
          </div>
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="至少选择一项">
          <AutoComplete
            style={{ width: '100%' }}
            placeholder="请输入搜索内容..."
            data={['123', '234', '345', '456']}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            showTime
            onChange={(a) => {
              console.log(a);
            }}
            placeholder={['开始时间', '结束时间']}
          />
        </Form.Item>
        <Form.Item help="请选择日期" validateStatus={status} hasFeedback>
          <Input.Group>
            <DatePicker style={{ width: '48%' }} placeholder="请选择日期" />
            <span
              style={{
                width: '4%',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <TimePicker placeholder="请选择时间" style={{ width: '48%' }}  />
          </Input.Group>
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="至少选择一项">
          <Cascader placeholder="请选择区域..." allowClear options={[]} />
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status}>
          <Select
            mode="multiple"
            allowCreate
            placeholder="请选择..."
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="这是数字输入框">
          <InputNumber placeholder="请输入数值..." />
        </Form.Item>
        <Form.Item help="请选择树节点" hasFeedback validateStatus={status}>
          <TreeSelect placeholder="请选择节点...">
            <TreeSelect.Node key="node1" title="Node 1">
              <TreeSelect.Node key="node2" title="Node 2" />
            </TreeSelect.Node>
          </TreeSelect>
        </Form.Item>
      </Form>
    </div>
  );
}
