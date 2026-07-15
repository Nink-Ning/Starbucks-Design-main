<template>
  <Space size="large">
    <Statistic title="New Users" :value="125670" show-group-separator>
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </Statistic>
    <Statistic
      title="User Growth Rate"
      :value="50.52"
      :precision="2"
      :value-style="{ color: '#0fbf60' }"
    >
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </Statistic>
  </Space>
</template>