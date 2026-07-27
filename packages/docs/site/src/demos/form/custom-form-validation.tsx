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
    <div style={{ maxWidth: 650 }}>
      <Form labelCol={{ span: 8 }} autoComplete="off" wrapperCol={{ span: 16 }} size={size}>
        <div>
          <Radio.Group
            value={status}
            type="button"
            onChange={setStatus}
            options={['validating', 'success', 'error', 'warning']}
          ></Radio.Group>
          <br />
          <br />

          <Radio.Group
            type="button"
            onChange={setSize}
            options={['mini', 'small', 'default', 'large']}
          ></Radio.Group>
        </div>
        <br />
        <Form.Item
          hasFeedback
          validateStatus={status}
          help="This is custom message"
          extra="This is extra text"
        >
          <Input placeholder="Input... " />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={status}
          help="This is custom message"
          extra="This is extra text"
        >
          <div>
            <Input placeholder="Input... " allowClear />
          </div>
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="Choose at least one">
          <AutoComplete
            style={{ width: '100%' }}
            placeholder="AutoComplete..."
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
            placeholder={['Start Time', 'End Time']}
          />
        </Form.Item>
        <Form.Item help="Please select date" validateStatus={status} hasFeedback>
          <Input.Group>
            <DatePicker style={{ width: '48%' }} placeholder="Select date" />
            <span
              style={{
                width: '4%',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <TimePicker placeholder="Select time" style={{ width: '48%' }}  />
          </Input.Group>
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="Choose at least one">
          <Cascader placeholder="Cascader..." allowClear options={[]} />
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status}>
          <Select
            mode="multiple"
            allowCreate
            placeholder="Select..."
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus={status} help="This is InputNumber">
          <InputNumber placeholder="InputNumber..." />
        </Form.Item>
        <Form.Item help="Select tree node" hasFeedback validateStatus={status}>
          <TreeSelect placeholder="TreeSelect...">
            <TreeSelect.Node key="node1" title="Node 1">
              <TreeSelect.Node key="node2" title="Node 2" />
            </TreeSelect.Node>
          </TreeSelect>
        </Form.Item>
      </Form>
    </div>
  );
}
