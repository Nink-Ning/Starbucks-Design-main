<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="status" type="button">
      <Radio value="validating">validating</Radio>
      <Radio value="success">success</Radio>
      <Radio value="error">error</Radio>
      <Radio value="warning">warning</Radio>
    </RadioGroup>
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
  </Space>
  <Form
    :model="form"
    :style="{ width: '600px', marginTop: '20px' }"
    :size="size"
  >
    <FormItem
      field="name"
      label="Username"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <Input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </FormItem>
    <FormItem
      field="post"
      label="Post"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <InputNumber
        v-model="form.post"
        placeholder="please enter your post..."
      />
    </FormItem>
    <FormItem
      field="tags"
      label="Tags"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <InputTag
        v-model="form.tags"
        placeholder="please enter your post..."
      />
    </FormItem>
    <FormItem
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
      :validate-status="status"
      feedback
    >
      <Select v-model="form.section" placeholder="Please select ...">
        <Option value="section one">Section One</Option>
        <Option value="section two">Section Two</Option>
        <Option value="section three">Section Three</Option>
      </Select>
    </FormItem>
    <FormItem label="DateRange" :validate-status="status" feedback>
      <RangePicker></RangePicker>
    </FormItem>

    <FormItem field="date" label="Date" :validate-status="status" feedback>
      <DatePicker></DatePicker>
    </FormItem>

    <FormItem field="time" label="Time" :validate-status="status" feedback>
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