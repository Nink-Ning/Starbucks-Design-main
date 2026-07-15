<template>
  <Row :gutter="[40, 20]">
    <Col :span="12">
      <Alert :show-icon="false">This is an info alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="success" :show-icon="false"
        >This is an success alert.</Alert
      >
    </Col>
    <Col :span="12">
      <Alert type="warning" :show-icon="false">
        <template #title> Warning </template>
        This is an warning alert.
      </Alert>
    </Col>
    <Col :span="12">
      <Alert type="error" :show-icon="false">
        <template #title> Error </template>
        This is an error alert.
      </Alert>
    </Col>
  </Row>
</template>