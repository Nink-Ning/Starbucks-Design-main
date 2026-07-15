<template>
  <Card :bordered="false" :style="{ width: '100%' }">
    <CardGrid
      v-for="(_, index) in new Array(7)"
      :key="index"
      :hoverable="index % 2 === 0"
      :style="{ width: '25%' }"
    >
      <Card class="card-demo" title="Arco Card" :bordered="false">
        <template #extra>
          <Link>More</Link>
        </template>
        <p :style="{ margin: 0 }">
          {{ index % 2 === 0 ? 'Card allow to hover' : 'Card content' }}
        </p>
      </Card>
    </CardGrid>
  </Card>
</template>
<style scoped>
.card-demo {
  width: 100%;
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>