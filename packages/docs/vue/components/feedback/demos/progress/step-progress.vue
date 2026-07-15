<template>
  <div :style="{ width: '50%' }">
    <Progress :steps="3" :percent="0.3" />
    <Progress :steps="5" status="warning" :percent="1" />
    <Progress :steps="3" size="small" :percent="0.3" />
  </div>
</template>