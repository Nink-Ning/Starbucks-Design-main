<template>
  <Form
    ref="formRef"
    :rules="rules"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <FormItem field="name" label="Username" validate-trigger="blur">
      <Input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </FormItem>
    <FormItem field="password" label="密码" validate-trigger="blur">
      <InputPassword
        v-model="form.password"
        placeholder="please enter your password..."
      />
    </FormItem>
    <FormItem field="password2" label="确认密码" validate-trigger="blur">
      <InputPassword
        v-model="form.password2"
        placeholder="please confirm your password..."
      />
    </FormItem>
    <FormItem field="email" label="email">
      <Input v-model="form.email" placeholder="please enter your email..." />
    </FormItem>
    <FormItem field="ip" label="IP">
      <Input v-model="form.ip" placeholder="please enter your ip..." />
    </FormItem>
    <FormItem field="url" label="URL">
      <Input v-model="form.url" placeholder="please enter your url..." />
    </FormItem>
    <FormItem field="match" label="match">
      <Input v-model="form.match" placeholder="please enter your match..." />
    </FormItem>
    <FormItem>
      <Space>
        <Button html-type="submit">Submit</Button>
        <Button @click="$refs.formRef.resetFields()">Reset</Button>
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
      message: 'name is required',
    },
  ],
  password: [
    {
      required: true,
      message: 'password is required',
    },
  ],
  password2: [
    {
      required: true,
      message: 'password is required',
    },
    {
      validator: (value, cb) => {
        if (value !== form.password) {
          cb('two passwords do not match');
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
            cb('Please enter match');
          }
          if (value !== 'match') {
            cb('match must be match!');
          }
          resolve();
        });
      },
    },
  ],
};
</script>