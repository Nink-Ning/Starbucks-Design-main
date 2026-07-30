<template>
  <Form :model="form" :style="{ width: '100%' }">
    <FormItem
      label="门店名称"
      :content-flex="false"
      :merge-props="false"
      extra="错误提示合并展示"
    >
      <Row :gutter="8">
        <Col :span="12">
          <FormItem
            field="together.firstname"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入门店简称' }]"
            no-style
          >
            <Input
              v-model="form.together.firstname"
              placeholder="请输入门店简称..."
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            field="together.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入门店编码' }]"
            no-style
          >
            <Input
              v-model="form.together.lastname"
              placeholder="请输入门店编码..."
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="门店名称" :content-flex="false" :merge-props="false">
      <Row :gutter="8">
        <Col :span="12">
          <FormItem
            field="separate.firstname"
            validate-trigger="input"
            extra="错误提示单独展示"
            :rules="[{ required: true, message: '请输入门店简称' }]"
            hide-label
          >
            <Input
              v-model="form.separate.firstname"
              placeholder="请输入门店简称..."
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            field="separate.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入门店编码' }]"
            hide-label
          >
            <Input
              v-model="form.separate.lastname"
              placeholder="请输入门店编码..."
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="岗位信息" :content-flex="false" :merge-props="false">
      <Space direction="vertical" fill>
        <FormItem field="posts.post1" label="岗位 1">
          <Input
            v-model="form.posts.post1"
            placeholder="请输入岗位..."
          />
        </FormItem>
        <FormItem field="posts.post2" label="岗位 2">
          <Input
            v-model="form.posts.post2"
            placeholder="请输入岗位..."
          />
        </FormItem>
      </Space>
    </FormItem>
    <FormItem field="isRead">
      <Checkbox v-model="form.isRead"> 我已阅读门店配置说明 </Checkbox>
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
