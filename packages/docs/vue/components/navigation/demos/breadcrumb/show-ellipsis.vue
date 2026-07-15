<template>
  <Space direction="vertical">
    <Breadcrumb :max-count="3">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Sub Home</BreadcrumbItem>
      <BreadcrumbItem>All Channel</BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
      <BreadcrumbItem>Post</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb :max-count="3">
      <template #more-icon>
        <Tooltip content="more routes a/b/c">
          <icon-more />
        </Tooltip>
      </template>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Sub Home</BreadcrumbItem>
      <BreadcrumbItem>All Channel</BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
      <BreadcrumbItem>Post</BreadcrumbItem>
    </Breadcrumb>
  </Space>
</template>