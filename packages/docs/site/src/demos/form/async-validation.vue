<template>
  <Form ref="formRef" :model="form" :style="{ width: '100%' }">
    <FormItem field="name" label="门店名称" :rules="rules">
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem field="post" label="岗位">
      <Input v-model="form.post" placeholder="请输入岗位..." />
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> 我已确认门店信息准确 </Checkbox>
    </FormItem>
    <FormItem>
      <Button @click="handleClick">设置状态</Button>
    </FormItem>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const formRef = ref();
const form = reactive({
  name: '',
  post: '',
  isRead: false,
});
const rules = [
  {
    validator: (value, cb) => {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          if (value !== '上海烘焙工坊') {
            cb('门店名称必须为上海烘焙工坊');
          }
          resolve();
        }, 2000);
      });
    },
  },
];
const handleClick = () => {
  formRef.value.setFields({
    name: {
      status: 'error',
      message: '门店名称异步校验失败',
    },
    post: {
      status: 'error',
      message: '请确认岗位信息',
    },
  });
};
</script>
