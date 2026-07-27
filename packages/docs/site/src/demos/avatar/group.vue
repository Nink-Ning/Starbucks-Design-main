<template>
  <Space :size="32">
    <AvatarGroup>
      <Avatar :style="{ backgroundColor: '#7BC616' }">A</Avatar>
      <Avatar :style="{ backgroundColor: '#14C9C9' }">B</Avatar>
      <Avatar :style="{ backgroundColor: '#168CFF' }">C</Avatar>
      <Avatar :style="{ backgroundColor: '#FF7D00' }">Arco</Avatar>
      <Avatar :style="{ backgroundColor: '#FFC72E' }">Design</Avatar>
    </AvatarGroup>

    <AvatarGroup :size="24">
      <Avatar :style="{ backgroundColor: '#7BC616' }">A</Avatar>
      <Avatar :style="{ backgroundColor: '#14C9C9' }">B</Avatar>
      <Avatar :style="{ backgroundColor: '#168CFF' }">C</Avatar>
      <Avatar :style="{ backgroundColor: '#FF7D00' }">Arco</Avatar>
      <Avatar :style="{ backgroundColor: '#FFC72E' }">Design</Avatar>
    </AvatarGroup>

    <AvatarGroup :size="24" :max-count="3">
      <Avatar :style="{ backgroundColor: '#7BC616' }">A</Avatar>
      <Avatar :style="{ backgroundColor: '#14C9C9' }">B</Avatar>
      <Avatar :style="{ backgroundColor: '#168CFF' }">C</Avatar>
      <Avatar :style="{ backgroundColor: '#FF7D00' }">Arco</Avatar>
      <Avatar :style="{ backgroundColor: '#FFC72E' }">Design</Avatar>
    </AvatarGroup>
  </Space>
</template>
