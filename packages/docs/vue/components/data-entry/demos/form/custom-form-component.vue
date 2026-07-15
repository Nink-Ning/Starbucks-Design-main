<template>
  <Space style="margin-bottom: 20px;">
    <Switch v-model="disabled" />
    Disabled: {{ disabled }}
  </Space>
  <Form :model="form" :disabled="disabled" :style="{ width: '600px' }">
    <FormItem
      field="name"
      label="Username"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' },
      ]"
    >
      <MyInput
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue';


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