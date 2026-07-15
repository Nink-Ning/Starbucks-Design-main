<template>
  <Row :gutter="[40, 20]">
    <Col :span="12">
      <Alert closable>This is an info alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="success" closable>This is an success alert.</Alert>
    </Col>
    <Col :span="12">
      <Alert type="warning" closable>
        <template #title> Warning </template>
        This is an warning alert.
      </Alert>
    </Col>
    <Col :span="12">
      <Alert type="error" closable>
        <template #title> Error </template>
        This is an error alert.
      </Alert>
    </Col>
  </Row>
</template>