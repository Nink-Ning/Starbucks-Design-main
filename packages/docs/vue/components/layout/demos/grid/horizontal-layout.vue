<template>
  <div>
    <p>Arrange left</p>
    <Row class="grid-demo" justify="start">
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
    </Row>
    <p>Arrange center</p>
    <Row class="grid-demo" justify="center">
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
    </Row>
    <p>Arrange right</p>
    <Row class="grid-demo" justify="end">
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
    </Row>
    <p>Space around</p>
    <Row class="grid-demo" justify="space-around">
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
    </Row>
    <p>Space between</p>
    <Row class="grid-demo" justify="space-between">
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
      </Col>
      <Col :span="4">
        <div>col - 4</div>
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
.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>