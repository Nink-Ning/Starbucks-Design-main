<template>
  <Space direction="vertical" size="large">
    <InputSearch
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      button-text="Search"
      search-button
    />
    <InputSearch
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      search-button
    >
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default> Search </template>
    </InputSearch>
  </Space>
</template>