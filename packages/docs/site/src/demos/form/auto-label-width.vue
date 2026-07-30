<template>
  <Form
    :model="form"
    :style="{ width: '100%' }"
    auto-label-width
    @submit="handleSubmit"
  >
    <FormItem field="name" label="门店名称">
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem field="post" label="岗位">
      <Input v-model="form.post" placeholder="请输入岗位..." />
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> 我已阅读门店配置说明 </Checkbox>
    </FormItem>
    <FormItem>
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
const handleSubmit = (data) => {
  console.log(data);
};
</script>