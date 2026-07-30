<template>
  <Space :size="32">
    <AvatarGroup>
      <Avatar :style="{ backgroundColor: 'var(--color-primary)' }">A</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-success)' }">B</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-warning)' }">C</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-danger)' }">Nink</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-primary-active)' }">Starbucks</Avatar>
    </AvatarGroup>

    <AvatarGroup :size="24">
      <Avatar :style="{ backgroundColor: 'var(--color-primary)' }">A</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-success)' }">B</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-warning)' }">C</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-danger)' }">Nink</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-primary-active)' }">Starbucks</Avatar>
    </AvatarGroup>

    <AvatarGroup :size="24" :max-count="3">
      <Avatar :style="{ backgroundColor: 'var(--color-primary)' }">A</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-success)' }">B</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-warning)' }">C</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-danger)' }">Nink</Avatar>
      <Avatar :style="{ backgroundColor: 'var(--color-primary-active)' }">Starbucks</Avatar>
    </AvatarGroup>
  </Space>
</template>
