<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="status" type="button">
      <Radio value="validating">校验中</Radio>
      <Radio value="success">成功</Radio>
      <Radio value="error">错误</Radio>
      <Radio value="warning">预警</Radio>
    </RadioGroup>
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">迷你</Radio>
      <Radio value="small">小号</Radio>
      <Radio value="medium">默认</Radio>
      <Radio value="large">大号</Radio>
    </RadioGroup>
  </Space>
  <Form
    :model="form"
    :style="{ width: '100%', marginTop: '20px' }"
    :size="size"
  >
    <FormItem
      field="name"
      label="门店名称"
      help="自定义校验提示"
      extra="额外说明"
      :validate-status="status"
      feedback
    >
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem
      field="post"
      label="岗位"
      help="自定义校验提示"
      extra="额外说明"
      :validate-status="status"
      feedback
    >
      <InputNumber
        v-model="form.post"
        placeholder="请输入岗位..."
      />
    </FormItem>
    <FormItem
      field="tags"
      label="标签"
      help="自定义校验提示"
      extra="额外说明"
      :validate-status="status"
      feedback
    >
      <InputTag
        v-model="form.tags"
        placeholder="请输入岗位..."
      />
    </FormItem>
    <FormItem
      field="section"
      label="区域"
      :rules="[{ match: /section one/, message: '请选择配置一' }]"
      :validate-status="status"
      feedback
    >
      <Select v-model="form.section" placeholder="请选择...">
        <Option value="section one">配置一</Option>
        <Option value="section two">配置二</Option>
        <Option value="section three">配置三</Option>
      </Select>
    </FormItem>
    <FormItem label="日期范围" :validate-status="status" feedback>
      <RangePicker></RangePicker>
    </FormItem>

    <FormItem field="date" label="日期" :validate-status="status" feedback>
      <DatePicker></DatePicker>
    </FormItem>

    <FormItem field="time" label="时间" :validate-status="status" feedback>
      <TimePicker></TimePicker>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const status = ref('success');
const size = ref('medium');
const form = reactive({
  name: '',
  post: undefined,
  tags: ['tag1'],
  section: '',
});
</script>
