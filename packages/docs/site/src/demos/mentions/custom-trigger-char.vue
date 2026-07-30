<template>
  <Space direction="vertical" size="large" style="width: 100%">
    <Mention
      :data="['Nink', 'Zero', 'Kevin']"
      placeholder="输入 @Nink"
    />
    <Mention
      :data="['Nink', 'Zero', 'Kevin']"
      prefix="#"
      placeholder="input #"
    />
    <Mention
      :data="['Nink', 'Zero', 'Kevin']"
      prefix="$"
      placeholder="input $"
    />
  </Space>
</template>
