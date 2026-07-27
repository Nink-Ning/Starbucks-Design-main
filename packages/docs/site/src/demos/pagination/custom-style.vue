<template>
  <Space direction="vertical" size="large">
    <Pagination
      :total="200"
      :page-item-style="{ background: 'var(--color-bg-2)', marginRight: '2px' }"
      :active-page-item-style="{ background: 'var(--color-fill-2)' }"
    />
    <Pagination
      :total="200"
      :page-item-style="{ background: 'var(--color-bg-2)' }"
      :active-page-item-style="{ background: 'var(--color-fill-2)' }"
    />
  </Space>
</template>
