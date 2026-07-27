<template>
  <Space direction="vertical" size="large">
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #prepend> +86 </template>
    </Input>
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #append> RMB </template>
    </Input>

    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
      prepend="+86"
    >
    </Input>
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
      append="RMB"
    >
    </Input>
  </Space>
</template>