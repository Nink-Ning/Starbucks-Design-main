<template>
  <Form
    ref="formRef"
    :size="form.size"
    :model="form"
    :style="{ width: '100%' }"
    @submit="handleSubmit"
  >
    <FormItem field="size" label="表单尺寸">
      <RadioGroup v-model="form.size" type="button">
        <Radio value="mini">迷你</Radio>
        <Radio value="small">小号</Radio>
        <Radio value="medium">默认</Radio>
        <Radio value="large">大号</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem
      field="name"
      label="门店名称"
      :rules="[
        { required: true, message: '请输入门店名称' },
        { minLength: 5, message: '至少输入 5 个字符' },
      ]"
      :validate-trigger="['change', 'input']"
    >
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem
      field="age"
      label="运营年限"
      :rules="[
        { required: true, message: '请输入运营年限' },
        { type: 'number', max: 200, message: 'age is max than 200' },
      ]"
    >
      <InputNumber
        v-model="form.age"
        placeholder="请输入运营年限..."
      />
    </FormItem>
    <FormItem
      field="section"
      label="区域"
      :rules="[{ match: /section one/, message: '请选择配置一' }]"
    >
      <Select
        v-model="form.section"
        placeholder="请选择..."
        allow-clear
      >
        <Option value="section one">配置一</Option>
        <Option value="section two">配置二</Option>
        <Option value="section three">配置三</Option>
      </Select>
    </FormItem>
    <FormItem
      field="province"
      label="所属区域"
      :rules="[{ required: true, message: '请选择所属区域' }]"
    >
      <Cascader
        v-model="form.province"
        :options="options"
        placeholder="请选择..."
        allow-clear
      />
    </FormItem>
    <FormItem
      field="options"
      label="配置选项"
      :rules="[
        {
          type: 'array',
          minLength: 2,
          message: '至少选择两个配置项',
        },
      ]"
    >
      <CheckboxGroup v-model="form.options">
        <Checkbox value="option one">配置一</Checkbox>
        <Checkbox value="option two">选项二</Checkbox>
        <Checkbox value="option three">选项三</Checkbox>
        <Checkbox value="option four">选项四</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem field="date" label="日期">
      <DatePicker v-model="form.date" placeholder="请选择..." />
    </FormItem>
    <FormItem field="time" label="时间">
      <TimePicker v-model="form.time" placeholder="请选择..." />
    </FormItem>
    <FormItem
      field="radio"
      label="单选"
      :rules="[{ match: /one/, message: '请选择配置一' }]"
    >
      <RadioGroup v-model="form.radio">
        <Radio value="radio one">选项一</Radio>
        <Radio value="radio two">选项二</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem
      field="slider"
      label="滑动条"
      :rules="[{ type: 'number', min: 5, message: '滑动条数值不能小于 5' }]"
    >
      <Slider v-model="form.slider" :max="10" />
    </FormItem>
    <FormItem field="score" label="评分">
      <Rate v-model="form.score" allow-clear />
    </FormItem>
    <FormItem
      field="switch"
      label="开关"
      :rules="[{ type: 'boolean', true: true, message: '请确认该配置' }]"
    >
      <Switch v-model="form.switch" />
    </FormItem>
    <FormItem field="multiSelect" label="多选选择">
      <Select
        v-model="form.multiSelect"
        placeholder="请选择..."
        multiple
      >
        <Option value="section one">配置一</Option>
        <Option value="section two">配置二</Option>
        <Option value="section three">配置三</Option>
      </Select>
    </FormItem>
    <FormItem field="treeSelect" label="树选择">
      <TreeSelect
        :data="treeData"
        v-model="form.treeSelect"
        placeholder="请选择..."
      />
    </FormItem>
    <FormItem>
      <Space :size="16">
        <Button html-type="submit">提交</Button>
        <Button @click="$refs.formRef.resetFields()">重置</Button>
      </Space>
    </FormItem>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const handleSubmit = ({ values, errors }) => {
  console.log('values:', values, '\nerrors:', errors);
};

const form = reactive({
  size: 'medium',
  name: '',
  age: undefined,
  section: '',
  province: 'haidian',
  options: [],
  date: '',
  time: '',
  radio: 'radio one',
  slider: 5,
  score: 5,
  switch: false,
  multiSelect: ['section one'],
  treeSelect: '',
});
const options = [
  {
    value: 'beijing',
    label: '华东区',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: '上海烘焙工坊',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'XiCheng',
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
const treeData = [
  {
    key: 'node1',
    title: 'Node1',
    children: [
      {
        key: 'node2',
        title: 'Node2',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Node3',
    children: [
      {
        key: 'node4',
        title: 'Node4',
      },
      {
        key: 'node5',
        title: 'Node5',
      },
    ],
  },
];
</script>
