<template>
  <Skeleton>
    <Space direction="vertical" :style="{ width: '100%' }" size="large">
      <SkeletonLine :rows="3" />
      <SkeletonShape />
    </Space>
  </Skeleton>
</template>