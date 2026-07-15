<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <Row :gutter="20" :style="{ marginBottom: '20px' }">
      <Col :span="8">
        <Card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <Link>More</Link>
          </template>
          Card content
        </Card>
      </Col>
      <Col :span="8">
        <Card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <Link>More</Link>
          </template>
          Card content
        </Card>
      </Col>
      <Col :span="8">
        <Card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <Link>More</Link>
          </template>
          Card content
        </Card>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="16">
        <Card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <Link>More</Link>
          </template>
          Card content
        </Card>
      </Col>
      <Col :span="8">
        <Card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <Link>More</Link>
          </template>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
</template>