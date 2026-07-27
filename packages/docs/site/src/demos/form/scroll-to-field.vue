<template>
  <Space>
    <Button @click="formRef && formRef.validate()">Submit</Button>
    <Button @click="formRef && formRef.resetFields()">Reset</Button>
    <Button @click="formRef && formRef.scrollToField('name19')"
      >Scroll to the last field</Button
    >
  </Space>
  <Form
    ref="formRef"
    style="width: 500px;height: 300px;margin-top:20px;padding-right: 16px;overflow: auto"
    :model="form"
    :scrollToFirstError="true"
  >
    <template v-for="(fieldName, index) in fieldNames" :key="index">
      <FormItem
        :field="fieldName"
        :label="'user' + index"
        :rules="[{ required: true, message: 'Name is required' }]"
      >
        <Input v-model="form[fieldName]" />
      </FormItem>
    </template>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formRef = ref(null);
const fieldCount = 20;
const fieldNames = Array.from(
  { length: fieldCount },
  (_, index) => `name${index}`
);
const form = reactive(
  Object.fromEntries(
    fieldNames.map((fieldName, index) => [
      fieldName,
      index === 7 ? '' : index.toString(),
    ])
  )
);
</script>