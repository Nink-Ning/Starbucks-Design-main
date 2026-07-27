<template>
  <Button @click="handleClick">Open Form Modal</Button>
  <Modal
    v-model:visible="visible"
    title="Modal Form"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <Form :model="form">
      <FormItem field="name" label="Name">
        <Input v-model="form.name" />
      </FormItem>
      <FormItem field="post" label="Post">
        <Select v-model="form.post">
          <Option value="post1">Post1</Option>
          <Option value="post2">Post2</Option>
          <Option value="post3">Post3</Option>
          <Option value="post4">Post4</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const visible = ref(false);
const form = reactive({
  name: '',
  post: '',
});

const handleClick = () => {
  visible.value = true;
};
const handleBeforeOk = (done) => {
  console.log(form);
  window.setTimeout(() => {
    done();
    // prevent close
    // done(false)
  }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};
</script>
