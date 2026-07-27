<template>
  <Row :gutter="[40, 20]">
    <Col :span="12">
      <Alert>This is an info alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="success">This is an success alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="warning">This is an warning alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="error">This is an error alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="normal">
        <template #icon>
          <icon-exclamation-circle-fill />
        </template>
        This is an normal alert.
      </Alert>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { IconExclamationCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
