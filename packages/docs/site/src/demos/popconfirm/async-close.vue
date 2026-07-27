<template>
  <Popconfirm @before-ok="handleBeforeOk">
    <Button>Click To Show</Button>
    <template #content>
      <Form>
        <FormItem label="Name">
          <Input />
        </FormItem>
        <FormItem label="Post">
          <Input />
        </FormItem>
      </Form>
    </template>
  </Popconfirm>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done();
  }, 3000);
};

const handleCancel = () => {
  visible.value = false;
};
</script>
