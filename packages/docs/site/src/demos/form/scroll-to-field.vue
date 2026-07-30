<template>
  <Space>
    <Button @click="formRef && formRef.validate()">提交</Button>
    <Button @click="formRef && formRef.resetFields()">重置</Button>
    <Button @click="formRef && formRef.scrollToField('name19')"
      >滚动到最后一个字段</Button
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
        :rules="[{ required: true, message: '请输入门店名称' }]"
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