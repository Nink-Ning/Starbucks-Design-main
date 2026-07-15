<template>
  <div>
    <p>Horizontal</p>
    <Row class="grid-demo" :gutter="24">
      <Col :span="12">
        <div>col - 12</div>
      </Col>
      <Col :span="12">
        <div>col - 12</div>
      </Col>
    </Row>
    <p>Responsive</p>
    <Row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
    </Row>
    <p>Horizontal and Vertical</p>
    <Row class="grid-demo" :gutter="[24, 12]">
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
      <Col :span="6">
        <div>col - 6</div>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
.grid-demo .arco-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .arco-col:nth-child(2n) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}
</style>