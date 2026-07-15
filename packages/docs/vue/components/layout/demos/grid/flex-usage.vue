<template>
  <Row class="grid-demo" style="margin-bottom: 16px;">
    <Col flex="100px">
      <div>100px</div>
    </Col>
    <Col flex="auto">
      <div>auto</div>
    </Col>
  </Row>
  <Row class="grid-demo" style="margin-bottom: 16px;">
    <Col flex="100px">
      <div>100px</div>
    </Col>
    <Col flex="auto">
      <div>auto</div>
    </Col>
    <Col flex="100px">
      <div>100px</div>
    </Col>
  </Row>
  <Row class="grid-demo" style="margin-bottom: 16px;">
    <Col :flex="3">
      <div>3 / 12</div>
    </Col>
    <Col :flex="4">
      <div>4 / 12</div>
    </Col>
    <Col :flex="5">
      <div>5 / 12</div>
    </Col>
  </Row>
</template>

<style scoped>
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}

.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
</style>