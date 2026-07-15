<template>
  <Space direction="vertical" size="large" :style="{ width: '600px' }">
    <RadioGroup v-model="layout" type="button">
      <Radio value="horizontal">horizontal</Radio>
      <Radio value="vertical">vertical</Radio>
      <Radio value="inline">inline</Radio>
    </RadioGroup>
    <Form :model="form" :layout="layout">
      <FormItem field="name" label="Username">
        <Input
          v-model="form.name"
          placeholder="please enter your username..."
        />
      </FormItem>
      <FormItem field="post" label="Post">
        <Input v-model="form.post" placeholder="please enter your post..." />
      </FormItem>
      <FormItem field="isRead">
        <Checkbox v-model="form.isRead"> I have read the manual </Checkbox>
      </FormItem>
      <FormItem>
        <Button>Submit</Button>
      </FormItem>
    </Form>
    <div>
      {{ form }}
    </div>
  </Space>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const layout = ref('horizontal');
const form = reactive({
  name: '',
  post: '',
  isRead: false,
});
</script>