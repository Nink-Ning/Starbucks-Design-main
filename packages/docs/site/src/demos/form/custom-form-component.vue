<template>
  <Space style="margin-bottom: 20px;">
    <Switch v-model="disabled" />
    Disabled: {{ disabled }}
  </Space>
  <Form :model="form" :disabled="disabled" :style="{ width: '100%' }">
    <FormItem
      field="name"
      label="门店名称"
      :rules="[
        { required: true, message: '请输入门店名称' },
        { minLength: 5, message: '至少输入 5 个字符' },
      ]"
    >
      <MyInput
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue';
import { useFormItem } from '@sbux/starbucks-design-vue';


const MyInput = {
  emits: ['update:modelValue'],
  setup: (_, { emit }) => {
    const { mergedDisabled, eventHandlers } = useFormItem();
    const handleInput = (ev) => {
      const { value } = ev.target;
      emit('update:modelValue', value);
      eventHandlers.value?.onChange?.(ev);
    };
    return () =>
      h('input', { disabled: mergedDisabled.value, onInput: handleInput });
  },
};

const disabled = ref(false);
const form = reactive({
  name: '',
});
</script>
