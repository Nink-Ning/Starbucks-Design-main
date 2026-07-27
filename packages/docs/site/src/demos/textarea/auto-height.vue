<template>
  <Textarea
    default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea."
    auto-size
  />
  <Textarea
    default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea."
    :auto-size="{
      minRows: 2,
      maxRows: 5,
    }"
    style="margin-top: 20px"
  />
</template>
