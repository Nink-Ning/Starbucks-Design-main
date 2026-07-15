<template>
  <Card title="Arco Card">
    <Card :style="{ marginBottom: '20px' }" title="Inner Card Title">
      <template #extra>
        <Link>More</Link>
      </template>
      Inner Card Content
    </Card>
    <Card title="Inner Card Title">
      <template #extra>
        <Link>More</Link>
      </template>
      Inner Card Content
    </Card>
  </Card>
</template>