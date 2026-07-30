<template>
  <Form :model="form" :style="{ width: '100%' }">
    <FormItem
      field="name"
      label="门店名称"
      validate-trigger="input"
      required
    >
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
      <template #extra>
        <div>Used to login</div>
      </template>
    </FormItem>
    <FormItem field="post" label="岗位" validate-trigger="input" required>
      <Input v-model="form.post" placeholder="请输入岗位..." />
      <template #extra>
        <div>Used to login</div>
      </template>
      <template #help>
        <div>Custom valitae message</div>
      </template>
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> 我已阅读门店配置说明 </Checkbox>
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
</script>