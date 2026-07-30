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
      value: 'east',
      label: '华东区',
      children: [
        {
          value: 'shanghai',
          label: '上海市',
          children: [
            {
              value: 'xuhui',
              label: '徐汇区',
              children: [
                {
                  value: 'roastery',
                  label: '上海烘焙工坊',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'south',
      label: '华南区',
      children: [
        {
          value: 'guangzhou',
          label: '广州市',
          children: [
            {
              value: 'tianhe',
              label: '天河区',
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
    <div style={{ width: '100%' }}>
      <Form
        ref={formRef}
        {...formItemLayout}
        size={size}
        autoComplete="off"
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <Form.Item label="表单尺寸">
          <Radio.Group type="button" value={size} onChange={setSize}>
            <Radio value="mini">mini</Radio>
            <Radio value="small">small</Radio>
            <Radio value="default">default</Radio>
            <Radio value="large">large</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="门店名称">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item label="运营年限">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="所属区域">
          <Cascader showSearch placeholder="请选择" allowClear options={cascaderOptions} />
        </Form.Item>
        <Form.Item label="自动补全">
          <AutoComplete placeholder="请输入" data={['123', '234', '345', '456']} />
        </Form.Item>
        <Form.Item label="岗位">
          <Select
            placeholder="请选择"
            options={[
              {
                label: '值班经理',
                value: 0,
              },
              {
                label: '咖啡师',
                value: 1,
              },
              {
                label: '区域督导',
                value: 2,
              },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item label="多选配置">
          <Select
            mode="multiple"
            allowCreate
            placeholder="请选择"
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </Form.Item>
        <Form.Item label="树选择">
          <TreeSelect allowClear placeholder="请选择">
            <TreeSelect.Node key="node1" title="华东区">
              <TreeSelect.Node key="node2" title="上海烘焙工坊" />
            </TreeSelect.Node>
            <TreeSelect.Node key="node3" title="华南区">
              <TreeSelect.Node key="node4" title="广州天河门店" />
              <TreeSelect.Node key="node5" title="深圳臻选门店" />
            </TreeSelect.Node>
          </TreeSelect>
        </Form.Item>
        <Form.Item label="日期">
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </div>
  );
}
