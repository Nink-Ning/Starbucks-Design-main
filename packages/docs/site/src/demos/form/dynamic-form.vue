<template>
  <Form :model="form" :style="{ width: '600px' }">
    <FormItem field="name" label="Username">
      <Input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </FormItem>
    <FormItem
      v-for="(post, index) of form.posts"
      :field="`posts[${index}].value`"
      :label="`Post-${index}`"
      :key="index"
    >
      <Input v-model="post.value" placeholder="please enter your post..." />
      <Button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
        >Delete</Button
      >
    </FormItem>
  </Form>
  <div>
    <Button @click="handleAdd">Add Post</Button>
  </div>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  name: '',
  posts: [{ value: '' }],
});
const handleAdd = () => {
  form.posts.push({
    value: '',
  });
};
const handleDelete = (index) => {
  form.posts.splice(index, 1);
};
</script>