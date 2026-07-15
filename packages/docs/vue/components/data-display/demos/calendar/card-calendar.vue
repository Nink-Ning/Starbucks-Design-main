<template>
  <Space align="start">
    <Calendar
      panel
      :default-value="new Date('2020-04-01')"
      panel-today-btn
      style="margin-right: 50px"
    />
    <Calendar panel :default-value="new Date('2020-03-01')" mode="year" />
  </Space>
</template>