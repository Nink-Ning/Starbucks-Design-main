<template>
  <Steps>
    <Step description="This is a description">
      Succeeded
      <template #icon>
        <icon-home />
      </template>
    </Step>
    <Step description="This is a description">
      Processing
      <template #icon>
        <icon-loading />
      </template>
    </Step>
    <Step description="This is a description">
      Pending
      <template #icon>
        <icon-thumb-up />
      </template>
    </Step>
  </Steps>
</template>