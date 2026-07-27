<template>
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <Card :style="{ width: '360px' }" title="Arco Card" :bordered="false">
      <template #extra>
        <Link>More</Link>
      </template>
      Card content
      <br />
      Card content
    </Card>
    <Card
      :style="{ width: '360px', marginLeft: '24px' }"
      title="Hover me"
      hoverable
      :bordered="false"
    >
      <template #extra>
        <Link>More</Link>
      </template>
      Card content
      <br />
      Card content
    </Card>
  </div>
</template>
