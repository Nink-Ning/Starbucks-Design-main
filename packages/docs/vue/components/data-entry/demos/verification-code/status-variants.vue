<template>
  <Space direction="vertical">
    <Space>
      <TypographyText style="width: 80px">Disabled:</TypographyText>
      <VerificationCode
        defaultValue="123456"
        style="width: 300px"
        disabled
      />
    </Space>
    <Space>
      <TypographyText style="width: 80px">Readonly:</TypographyText>
      <VerificationCode
        defaultValue="123456"
        style="width: 300px"
        readonly
      />
    </Space>
    <Space>
      <TypographyText style="width: 80px">Error:</TypographyText>
      <VerificationCode defaultValue="123456" style="width: 300px" error />
    </Space>
  </Space>
</template>