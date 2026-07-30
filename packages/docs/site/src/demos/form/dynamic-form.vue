<template>
  <Form :model="form" :style="{ width: '100%' }">
    <FormItem field="name" label="门店名称">
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem
      v-for="(post, index) of form.posts"
      :field="`posts[${index}].value`"
      :label="`岗位-${index}`"
      :key="index"
    >
      <Input v-model="post.value" placeholder="请输入岗位..." />
      <Button @click="handleDelete(index)" :style="{ marginLeft: '10px' }">删除</Button>
    </FormItem>
  </Form>
  <div>
    <Button @click="handleAdd">新增岗位</Button>
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
