<template>
  <Space direction="vertical">
    <VerificationCode
      defaultValue="123456"
      style="width: 300px"
      :formatter="
        (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)
      "
    />
    <VerificationCode
      defaultValue="abcdef"
      style="width: 300px"
      :formatter="
        (inputValue) =>
          /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : ''
      "
    />
  </Space>
</template>
