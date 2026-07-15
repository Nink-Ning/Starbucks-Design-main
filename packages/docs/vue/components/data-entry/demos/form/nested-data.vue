<template>
  <Form :model="form" :style="{ width: '600px' }">
    <FormItem
      label="Username"
      :content-flex="false"
      :merge-props="false"
      extra="Show error message together"
    >
      <Row :gutter="8">
        <Col :span="12">
          <FormItem
            field="together.firstname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'firstname is required' }]"
            no-style
          >
            <Input
              v-model="form.together.firstname"
              placeholder="please enter your firstname..."
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            field="together.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'lastname is required' }]"
            no-style
          >
            <Input
              v-model="form.together.lastname"
              placeholder="please enter your lastname..."
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="Username" :content-flex="false" :merge-props="false">
      <Row :gutter="8">
        <Col :span="12">
          <FormItem
            field="separate.firstname"
            validate-trigger="input"
            extra="Show error message separate"
            :rules="[{ required: true, message: 'firstname is required' }]"
            hide-label
          >
            <Input
              v-model="form.separate.firstname"
              placeholder="please enter your firstname..."
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            field="separate.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'lastname is required' }]"
            hide-label
          >
            <Input
              v-model="form.separate.lastname"
              placeholder="please enter your lastname..."
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="Posts" :content-flex="false" :merge-props="false">
      <Space direction="vertical" fill>
        <FormItem field="posts.post1" label="Post1">
          <Input
            v-model="form.posts.post1"
            placeholder="please enter your post..."
          />
        </FormItem>
        <FormItem field="posts.post2" label="Post2">
          <Input
            v-model="form.posts.post2"
            placeholder="please enter your post..."
          />
        </FormItem>
      </Space>
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> I have read the manual </Checkbox>
    </FormItem>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  together: {
    firstname: '',
    lastname: '',
  },
  separate: {
    firstname: '',
    lastname: '',
  },
  posts: {
    post1: '',
    post2: '',
  },
  isRead: false,
});
</script>