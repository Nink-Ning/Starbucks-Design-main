<template>
  <Form :model="form" :style="{ width: '600px' }" disabled>
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