<template>
  <Form :model="form">
    <Row :gutter="16">
      <Col :span="8">
        <FormItem field="value1" label="Value 1" label-col-flex="100px">
          <Input v-model="form.value1" placeholder="请输入..." />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem field="value2" label="Value 2" label-col-flex="80px">
          <Input v-model="form.value2" placeholder="请输入..." />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem field="value3" label="Value 3" label-col-flex="80px">
          <Input v-model="form.value3" placeholder="请输入..." />
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col :span="16">
        <FormItem field="value4" label="Value 4" label-col-flex="100px">
          <Input v-model="form.value4" placeholder="请输入..." />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem field="value5" label="Value 5" label-col-flex="80px">
          <Input v-model="form.value5" placeholder="请输入..." />
        </FormItem>
      </Col>
    </Row>
  </Form>
  {{ form }}
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
});
</script>