<template>
  <Row :gutter="[40, 20]">
    <Col :span="12">
      <Alert closable>
        <template #close-element>
          <icon-close-circle />
        </template>
        This is an info alert.
      </Alert>
    </Col>
    <Col :span="12">
      <Alert closable>
        <template #close-element> Close </template>
        This is an info alert.
      </Alert>
    </Col>
  </Row>
</template>