<template>
  <Form ref="formRef" :model="form" :style="{ width: '600px' }">
    <FormItem field="name" label="Username" :rules="rules">
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
      <Button @click="handleClick">Set Status</Button>
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
          if (value !== 'admin') {
            cb('name must be admin');
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
      message: 'async name error',
    },
    post: {
      status: 'error',
      message: 'valid post',
    },
  });
};
</script>