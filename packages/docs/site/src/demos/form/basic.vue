<template>
  <Form
    :model="form"
    :style="{ width: '100%' }"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @submit="handleSubmit"
  >
    <FormItem field="name" tooltip="请输入内容" label="输入框">
      <Input
        v-model="form.name"
        placeholder="请输入内容..."
      />
    </FormItem>
    <FormItem field="post" label="文本域">
      <Textarea
        v-model="form.post"
        placeholder="请输入内容..."
        :auto-size="{ minRows: 3 }"
      />
    </FormItem>
    <FormItem field="isRead" :wrapper-col="noLabelWrapperCol">
      <Checkbox v-model="form.isRead"> 我已阅读门店配置说明 </Checkbox>
    </FormItem>
    <FormItem :wrapper-col="noLabelWrapperCol">
      <Button html-type="submit">提交</Button>
    </FormItem>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  name: '',
  post: '',
  isRead: false,
});
const labelCol = {
  style: { width: '96px', maxWidth: '96px', flex: '0 0 96px' },
};
const wrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none' },
};
const noLabelWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none', marginLeft: '96px' },
};
const handleSubmit = (data) => {
  console.log(data);
};
</script>
