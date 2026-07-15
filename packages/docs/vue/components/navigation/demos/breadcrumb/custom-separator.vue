<template>
  <Space direction="vertical">
    <Breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb separator="~">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <BreadcrumbItem separator="->">Home</BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
  </Space>
</template>