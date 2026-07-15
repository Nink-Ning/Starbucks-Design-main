<template>
  <div :style="{ display: 'flex' }">
    <Card :style="{ width: '360px' }" title="Arco Card" hoverable>
      <template #extra>
        <Link>More</Link>
      </template>
      Card content <br />
      Card content
    </Card>
    <Card class="card-demo" title="Custom hover style" hoverable>
      <template #extra>
        <Link>More</Link>
      </template>
      Card content <br />
      Card content
    </Card>
  </div>
</template>
<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>