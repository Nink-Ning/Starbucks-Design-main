import { useRef, useState } from 'react';
import {
  Form,
  Radio,
  Input,
  InputNumber,
  Cascader,
  AutoComplete,
  Select,
  TreeSelect,
  DatePicker,
} from '@sbux/starbucks-design-react';

export default function Demo() {
  const formRef = useRef();
  const [size, setSize] = useState('default');

  const cascaderOptions = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'beijingshi',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const noLabelLayout = {
    wrapperCol: {
      span: 17,
      offset: 7,
    },
  };

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <div style={{ maxWidth: 650 }}>
      <Form
        ref={formRef}
        {...formItemLayout}
        size={size}
        autoComplete="off"
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <Form.Item label="Form size">
          <Radio.Group type="button" value={size} onChange={setSize}>
            <Radio value="mini">mini</Radio>
            <Radio value="small">small</Radio>
            <Radio value="default">default</Radio>
            <Radio value="large">large</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Username">
          <Input placeholder="please enter..." />
        </Form.Item>
        <Form.Item label="Age">
          <InputNumber placeholder="please enter" />
        </Form.Item>
        <Form.Item label="Province">
          <Cascader showSearch placeholder="please select" allowClear options={cascaderOptions} />
        </Form.Item>
        <Form.Item label="Auto-complete">
          <AutoComplete placeholder="please enter" data={['123', '234', '345', '456']} />
        </Form.Item>
        <Form.Item label="Post">
          <Select
            placeholder="please select"
            options={[
              {
                label: 'one',
                value: 0,
              },
              {
                label: 'two',
                value: 1,
              },
              {
                label: 'three',
                value: 2,
              },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Multiple Choice">
          <Select
            mode="multiple"
            allowCreate
            placeholder="please select"
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect allowClear placeholder="please select">
            <TreeSelect.Node key="node1" title="Trunk(node1)">
              <TreeSelect.Node key="node2" title="Leaf(node2)" />
            </TreeSelect.Node>
            <TreeSelect.Node key="node3" title="Trunk2(node3)">
              <TreeSelect.Node key="node4" title="Leaf(node4)" />
              <TreeSelect.Node key="node5" title="Leaf(node5)" />
            </TreeSelect.Node>
          </TreeSelect>
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </div>
  );
}
