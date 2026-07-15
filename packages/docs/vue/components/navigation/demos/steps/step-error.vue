<template>
  <Steps :current="2" status="error">
    <Step description="This is a description">Succeeded</Step>
    <Step description="This is a description">Error</Step>
    <Step description="This is a description">Pending</Step>
  </Steps>
</template>