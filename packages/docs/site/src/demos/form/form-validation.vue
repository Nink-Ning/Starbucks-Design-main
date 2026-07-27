<template>
  <Form
    ref="formRef"
    :size="form.size"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <FormItem field="size" label="Form Size">
      <RadioGroup v-model="form.size" type="button">
        <Radio value="mini">Mini</Radio>
        <Radio value="small">Small</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="large">Large</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem
      field="name"
      label="Username"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' },
      ]"
      :validate-trigger="['change', 'input']"
    >
      <Input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </FormItem>
    <FormItem
      field="age"
      label="Age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', max: 200, message: 'age is max than 200' },
      ]"
    >
      <InputNumber
        v-model="form.age"
        placeholder="please enter your age..."
      />
    </FormItem>
    <FormItem
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
    >
      <Select
        v-model="form.section"
        placeholder="Please select ..."
        allow-clear
      >
        <Option value="section one">Section One</Option>
        <Option value="section two">Section Two</Option>
        <Option value="section three">Section Three</Option>
      </Select>
    </FormItem>
    <FormItem
      field="province"
      label="Province"
      :rules="[{ required: true, message: 'province is required' }]"
    >
      <Cascader
        v-model="form.province"
        :options="options"
        placeholder="Please select ..."
        allow-clear
      />
    </FormItem>
    <FormItem
      field="options"
      label="Options"
      :rules="[
        {
          type: 'array',
          minLength: 2,
          message: 'must select greater than two options',
        },
      ]"
    >
      <CheckboxGroup v-model="form.options">
        <Checkbox value="option one">Section One</Checkbox>
        <Checkbox value="option two">Option Two</Checkbox>
        <Checkbox value="option three">Option Three</Checkbox>
        <Checkbox value="option four">Option Four</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem field="date" label="Date">
      <DatePicker v-model="form.date" placeholder="Please select ..." />
    </FormItem>
    <FormItem field="time" label="Time">
      <TimePicker v-model="form.time" placeholder="Please select ..." />
    </FormItem>
    <FormItem
      field="radio"
      label="Radio"
      :rules="[{ match: /one/, message: 'must select one' }]"
    >
      <RadioGroup v-model="form.radio">
        <Radio value="radio one">Radio One</Radio>
        <Radio value="radio two">Radio Two</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem
      field="slider"
      label="Slider"
      :rules="[{ type: 'number', min: 5, message: 'slider is min than 5' }]"
    >
      <Slider v-model="form.slider" :max="10" />
    </FormItem>
    <FormItem field="score" label="Score">
      <Rate v-model="form.score" allow-clear />
    </FormItem>
    <FormItem
      field="switch"
      label="Switch"
      :rules="[{ type: 'boolean', true: true, message: 'must be true' }]"
    >
      <Switch v-model="form.switch" />
    </FormItem>
    <FormItem field="multiSelect" label="Multiple Select">
      <Select
        v-model="form.multiSelect"
        placeholder="Please select ..."
        multiple
      >
        <Option value="section one">Section One</Option>
        <Option value="section two">Section Two</Option>
        <Option value="section three">Section Three</Option>
      </Select>
    </FormItem>
    <FormItem field="treeSelect" label="Tree Select">
      <TreeSelect
        :data="treeData"
        v-model="form.treeSelect"
        placeholder="Please select ..."
      />
    </FormItem>
    <FormItem>
      <Space>
        <Button html-type="submit">Submit</Button>
        <Button @click="$refs.formRef.resetFields()">Reset</Button>
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
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
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