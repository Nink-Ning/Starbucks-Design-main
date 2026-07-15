<template>
  <Form :model="form" :style="{ width: '600px' }">
    <FormItem
      field="name"
      label="Username"
      validate-trigger="input"
      required
    >
      <Input
        v-model="form.name"
        placeholder="please enter your username..."
      />
      <template #extra>
        <div>Used to login</div>
      </template>
    </FormItem>
    <FormItem field="post" label="Post" validate-trigger="input" required>
      <Input v-model="form.post" placeholder="please enter your post..." />
      <template #extra>
        <div>Used to login</div>
      </template>
      <template #help>
        <div>Custom valitae message</div>
      </template>
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> I have read the manual </Checkbox>
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