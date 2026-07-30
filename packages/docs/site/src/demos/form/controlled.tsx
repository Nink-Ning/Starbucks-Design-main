import { useRef, useState, useEffect } from 'react';
import {
  Form,
  Radio,
  Input,
  InputNumber,
  Cascader,
  AutoComplete,
  Select,
  TreeSelect,
  Rate,
  DatePicker,
  Switch,
  Slider,
  Upload,
  Checkbox,
  Button,
  Modal,
  Message,
  Space,
} from '@sbux/starbucks-design-react';

export default function Demo() {
  const formRef = useRef();
  const [size, setSize] = useState('default');
  useEffect(() => {
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  const cascaderOptions = [
    {
      value: 'beijing',
      label: '华东区',
      children: [
        {
          value: 'beijingshi',
          label: '华东区',
          children: [
            {
              value: 'chaoyang',
              label: '徐汇区',
              children: [
                {
                  value: 'datunli',
                  label: '上海烘焙工坊',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: '华南区',
      children: [
        {
          value: 'shanghaishi',
          label: '华南区',
          children: [
            {
              value: 'huangpu',
              label: '天河区',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {
    labelCol: {
      style: { width: 96, maxWidth: 96, flex: '0 0 96px' },
    },
    wrapperCol: {
      style: { flex: '1 1 0', maxWidth: 'none' },
    },
  };
  const noLabelLayout = {
    wrapperCol: {
      style: { flex: '1 1 0', maxWidth: 'none', marginLeft: 96 },
    },
  };

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <div style={{ maxWidth: 650 }}>
      <Form
        ref={formRef}
        autoComplete="off"
        {...formItemLayout}
        size={size}
        initialValues={{
          slider: 20,
          'a.b[0].c': ['b'],
        }}
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
        <Form.Item label="门店名称" field="name" rules={[{ required: true }]}>
          <Input placeholder="请输入..." style={{ width: 350 }} />
        </Form.Item>
        <Form.Item label="运营年限" field="age" rules={[{ type: 'number', required: true }]}>
          <InputNumber placeholder="请输入" style={{ width: 160 }} />
        </Form.Item>
        <Form.Item
          label="所属区域"
          field="province"
          rules={[
            {
              type: 'array',
              required: true,
            },
            {
              type: 'array',
              length: 4,
            },
          ]}
        >
          <Cascader
            showSearch
            placeholder="请选择"
            allowClear
            options={cascaderOptions}
            style={{ width: 320 }}
          />
        </Form.Item>
        <Form.Item label="自动补全" field="autocomplete" rules={[{ required: true }]}>
          <AutoComplete
            placeholder="请输入"
            data={['123', '234', '345', '456']}
            style={{ width: 350 }}
          />
        </Form.Item>
        <Form.Item label="岗位" field="post" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
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
            style={{ width: 320 }}
          />
        </Form.Item>
        <Form.Item
          label="多选配置"
          required
          field="a.b[0].c"
          rules={[{ type: 'array', minLength: 1 }]}
        >
          <Select
            mode="multiple"
            allowCreate
            placeholder="请选择"
            options={['a', 'b', 'c', 'd', 'e']}
            style={{ width: 320 }}
          />
        </Form.Item>
        <Form.Item label="树选择" field="treenode" rules={[{ required: true }]}>
          <TreeSelect allowClear placeholder="请选择" style={{ width: 320 }}>
            <TreeSelect.Node key="node1" title="华东区">
              <TreeSelect.Node key="node2" title="上海烘焙工坊" />
            </TreeSelect.Node>
            <TreeSelect.Node key="node3" title="华南区">
              <TreeSelect.Node key="node4" title="广州天河门店" />
              <TreeSelect.Node key="node5" title="深圳臻选门店" />
            </TreeSelect.Node>
          </TreeSelect>
        </Form.Item>
        <Form.Item label="评分" field="score" rules={[{ required: true, type: 'number' }]}>
          <Rate />
        </Form.Item>
        <Form.Item label="日期" field="date" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="开关"
          field="switch"
          triggerPropName="checked"
          rules={[{ type: 'boolean', true: true }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="单选"
          field="radio"
          rules={[
            {
              validator: (value, callback) => {
                if (value !== 'b') {
                  callback('只能选择 B');
                }
              },
            },
          ]}
        >
          <Radio.Group>
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
            <Radio disabled value="c">
              C
            </Radio>
            <Radio value="d"> D </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="滑动条"
          field="slider"
          rules={[
            {
              validator: (value, callback) => {
                if (value < 50) {
                  callback('数值必须大于 50');
                }
              },
            },
          ]}
        >
          <Slider style={{ width: 280 }}></Slider>
        </Form.Item>
        <Form.Item
          label="上传附件"
          field="upload"
          triggerPropName="fileList"
          initialValue={[
            {
              uid: '-1',
              url: '/img/logo-icon.svg',
              name: '20200717',
            },
          ]}
        >
          <Upload
            listType="picture-card"
            multiple
            name="files"
            action="/"
            onPreview={(file) => {
              Modal.info({
                title: '预览附件',
                content: (
                  <img
                    src={file.url || URL.createObjectURL(file.originFile)}
                    style={{
                      maxWidth: '100%',
                    }}
                  ></img>
                ),
              });
            }}
          />
        </Form.Item>
        <Form.Item
          {...noLabelLayout}
          field="readme"
          triggerPropName="checked"
          rules={[{ type: 'boolean', true: true }]}
        >
          <Checkbox>我已阅读员工手册</Checkbox>
        </Form.Item>
        <Form.Item {...noLabelLayout}>
          <Space size={16}>
            <Button
              onClick={async () => {
                if (formRef.current) {
                  try {
                    await formRef.current.validate();
                    Message.info('校验通过，提交成功！');
                  } catch (_) {
                    console.log(formRef.current.getFieldsError());
                    Message.error('校验失败，请检查字段！');
                  }
                }
              }}
              type="primary"
            >提交</Button>
            <Button
              onClick={() => {
                formRef.current.resetFields();
              }}
            >重置</Button>
            <Button
              type="text"
              onClick={() => {
                Message.info(`fields: ${formRef.current.getTouchedFields().join(',')}`);
              }}
            >
              获取已修改字段
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
