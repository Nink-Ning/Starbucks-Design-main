<template>
  <Space direction="vertical" size="large">
    <Pagination :total="200" :buffer-size="0" :default-current="10" show-page-size />
    <Pagination :total="200" :buffer-size="1" :default-current="10" show-page-size />
    <Pagination :total="200" :buffer-size="2" :default-current="10" show-page-size />
  </Space>
</template>
