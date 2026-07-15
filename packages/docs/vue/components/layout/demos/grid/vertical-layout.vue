<template>
  <div>
    <p>Arrange top</p>
    <Row class="grid-demo" align="start">
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
    <p>Arrange center</p>
    <Row class="grid-demo" align="center">
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
    <p>Arrange bottom</p>
    <Row class="grid-demo" align="end">
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
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .arco-col:nth-of-type(1) {
  height: 90px;
  line-height: 90px;
}
.grid-demo .arco-col:nth-of-type(2) {
  height: 48px;
  line-height: 48px;
}
.grid-demo .arco-col:nth-of-type(3) {
  height: 120px;
  line-height: 120px;
}
.grid-demo .arco-col:nth-of-type(4) {
  height: 60px;
  line-height: 60px;
}
.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>