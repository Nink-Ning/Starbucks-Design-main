<template>
  <div>
    <Steps :current="2">
      <Step>Succeeded</Step>
      <Step>Processing</Step>
      <Step>Pending</Step>
    </Steps>
    <Divider />
    <div style="line-height: 140px; text-align: center; color: #C9CDD4; ">
      Step 2 Content
    </div>
  </div>
</template>