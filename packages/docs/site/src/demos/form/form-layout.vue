<template>
  <Space direction="vertical" size="large" :style="{ width: '100%' }">
    <RadioGroup v-model="layout" type="button">
      <Radio value="horizontal">水平</Radio>
      <Radio value="vertical">垂直</Radio>
      <Radio value="inline">行内</Radio>
    </RadioGroup>
    <Form
      :model="form"
      :layout="layout"
      :label-col="layout === 'horizontal' ? horizontalLabelCol : undefined"
      :wrapper-col="layout === 'horizontal' ? horizontalWrapperCol : undefined"
    >
      <FormItem field="name" label="输入框">
        <Input
          v-model="form.name"
          placeholder="请输入内容..."
        />
      </FormItem>
      <FormItem field="post" label="输入框">
        <Input v-model="form.post" placeholder="请输入内容..." />
      </FormItem>
      <FormItem
        field="isRead"
        :wrapper-col="layout === 'horizontal' ? horizontalNoLabelWrapperCol : undefined"
      >
        <Checkbox v-model="form.isRead"> 我已阅读门店配置说明 </Checkbox>
      </FormItem>
      <FormItem :wrapper-col="layout === 'horizontal' ? horizontalNoLabelWrapperCol : undefined">
        <Button>提交</Button>
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
const horizontalLabelCol = {
  style: { width: '96px', maxWidth: '96px', flex: '0 0 96px' },
};
const horizontalWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none' },
};
const horizontalNoLabelWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none', marginLeft: '96px' },
};
</script>
