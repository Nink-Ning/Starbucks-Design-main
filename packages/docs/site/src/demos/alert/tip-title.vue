<template>
  <Row :gutter="[40, 20]">
    <Col :span="12">
      <Alert title="Info">This is an info alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert title="Success" type="success"
        >This is an success alert.</Alert
      >
    </Col>
    <Col :span="12">
      <Alert type="warning">
        <template #title> Warning </template>
        This is an warning alert.
      </Alert>
    </Col>
    <Col :span="12">
      <Alert type="error">
        <template #title> Error </template>
        This is an error alert.
      </Alert>
    </Col>
  </Row>
</template>
