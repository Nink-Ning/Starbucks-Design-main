<template>
  <div>
    <Steps type="arrow" :current="2" small style="margin-bottom: 20px;">
      <Step description="This is a description">Succeeded</Step>
      <Step description="This is a description">Processing</Step>
      <Step description="This is a description">Pending</Step>
    </Steps>
    <Steps type="arrow" :current="2" small status="error">
      <Step description="This is a description">Succeeded</Step>
      <Step description="This is a description">Processing</Step>
      <Step description="This is a description">Pending</Step>
    </Steps>
  </div>
</template>
