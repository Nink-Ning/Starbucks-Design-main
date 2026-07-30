<template>
  <Form
    ref="formRef"
    :rules="rules"
    :model="form"
    :style="{ width: '100%' }"
    @submit="handleSubmit"
  >
    <FormItem field="name" label="门店名称" validate-trigger="blur">
      <Input
        v-model="form.name"
        placeholder="请输入门店名称..."
      />
    </FormItem>
    <FormItem field="password" label="密码" validate-trigger="blur">
      <InputPassword
        v-model="form.password"
        placeholder="请输入密码..."
      />
    </FormItem>
    <FormItem field="password2" label="确认密码" validate-trigger="blur">
      <InputPassword
        v-model="form.password2"
        placeholder="请再次输入密码..."
      />
    </FormItem>
    <FormItem field="email" label="邮箱">
      <Input v-model="form.email" placeholder="请输入邮箱..." />
    </FormItem>
    <FormItem field="ip" label="IP">
      <Input v-model="form.ip" placeholder="请输入 IP..." />
    </FormItem>
    <FormItem field="url" label="URL">
      <Input v-model="form.url" placeholder="请输入链接..." />
    </FormItem>
    <FormItem field="match" label="match">
      <Input v-model="form.match" placeholder="请输入匹配内容..." />
    </FormItem>
    <FormItem>
      <Space :size="16">
        <Button html-type="submit">提交</Button>
        <Button @click="$refs.formRef.resetFields()">重置</Button>
      </Space>
    </FormItem>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const handleSubmit = ({ values, errors }) => {
  console.log('values:', values, '\nerrors:', errors);
};

const form = reactive({
  name: '',
  password: '',
  password2: '',
  email: '',
  ip: '192.168.2.1',
  url: '',
  match: '',
});

const rules = {
  name: [
    {
      required: true,
      message: '请输入门店名称',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
  password2: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      validator: (value, cb) => {
        if (value !== form.password) {
          cb('两次输入的密码不一致');
        } else {
          cb();
        }
      },
    },
  ],
  email: [
    {
      type: 'email',
      required: true,
    },
  ],
  ip: [
    {
      type: 'ip',
      required: true,
    },
  ],
  url: [
    {
      type: 'url',
      required: true,
    },
  ],
  match: [
    {
      required: true,
      validator: (value, cb) => {
        return new Promise((resolve) => {
          if (!value) {
            cb('请输入匹配内容');
          }
          if (value !== 'match') {
            cb('匹配内容必须为 match');
          }
          resolve();
        });
      },
    },
  ],
};
</script>
