<template>
  <Space direction="vertical" size="large" style="width: 100%">
    <Mention
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      placeholder="input @"
    />
    <Mention
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      prefix="#"
      placeholder="input #"
    />
    <Mention
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      prefix="$"
      placeholder="input $"
    />
  </Space>
</template>